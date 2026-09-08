import crypto from 'node:crypto';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const apiUrl = String(process.env.PAINELURE_API_URL || 'https://painelure2-api.onrender.com').replace(/\/+$/, '');
const database = process.env.PAINELURE_D1_DATABASE || 'painelure-cloudflare';
const initialPin = String(process.env.PAINELURE_INITIAL_PIN || '1234');

function sql(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(String(password), salt, 120000, 32, 'sha256').toString('hex');
  return `pbkdf2$${salt}$${hash}`;
}

async function request(path, options = {}) {
  const response = await fetch(`${apiUrl}${path}`, { ...options, headers: { Accept: 'application/json', ...(options.headers || {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status} - ${payload.error || 'resposta inválida'}`);
  return payload;
}

async function main() {
  const loginBody = process.env.PAINELURE_ADMIN_KEY
    ? { key: process.env.PAINELURE_ADMIN_KEY }
    : { username: process.env.PAINELURE_ADMIN_USER, password: process.env.PAINELURE_ADMIN_PASSWORD };
  if ((!loginBody.key && !loginBody.username) || (!loginBody.key && !loginBody.password)) {
    throw new Error('Defina PAINELURE_ADMIN_KEY ou PAINELURE_ADMIN_USER e PAINELURE_ADMIN_PASSWORD.');
  }

  const login = await request('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(loginBody) });
  const headers = { Authorization: `Bearer ${login.token}` };
  const [dataPayload, usersPayload, sourcesPayload, snapshotsPayload, auditPayload, importsPayload] = await Promise.all([
    request('/api/data', { headers }),
    request('/api/users', { headers }),
    request('/api/sources', { headers }),
    request('/api/snapshots?limit=100', { headers }),
    request('/api/audit?limit=200', { headers }),
    request('/api/imports?limit=100', { headers })
  ]);

  const now = new Date().toISOString();
  const store = {
    version: 1,
    source: 'migration-render',
    updatedAt: dataPayload.data?.updatedAt || now,
    appData: dataPayload.data?.appData || {}
  };
  const sources = Object.fromEntries((sourcesPayload.sources || []).map(source => [source.key, source]));
  const statements = [
    `INSERT INTO app_state (id, payload, source, updated_at) VALUES ('main', ${sql(JSON.stringify(store))}, 'migration-render', ${sql(store.updatedAt)}) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload, source=excluded.source, updated_at=excluded.updated_at;`,
    `INSERT INTO app_snapshots (id, payload, source, created_at) VALUES (${sql(crypto.randomUUID())}, ${sql(JSON.stringify(store))}, 'migration-render', ${sql(now)});`
  ];

  for (const user of usersPayload.users || []) {
    const pin = String(user.pin || initialPin);
    const preferences = { ...(user.preferences || {}), pin, forcePinChange: user.pin ? user.preferences?.forcePinChange : true, migratedFromRender: true };
    statements.push(`INSERT INTO users (id, username, name, role, contact_id, password_hash, avatar, preferences, created_at, updated_at) VALUES (${sql(user.id || crypto.randomUUID())}, ${sql(String(user.username || '').toLowerCase())}, ${sql(user.name || user.username || 'Usuário')}, ${sql(user.role || 'Consulta')}, ${sql(user.contactId || '')}, ${sql(hashPassword(pin))}, ${sql(user.avatar || '')}, ${sql(JSON.stringify(preferences))}, ${sql(now)}, ${sql(now)}) ON CONFLICT(username) DO UPDATE SET name=excluded.name, role=excluded.role, contact_id=excluded.contact_id, avatar=excluded.avatar, preferences=excluded.preferences, updated_at=excluded.updated_at;`);
  }

  for (const source of Object.values(sources)) {
    statements.push(`INSERT INTO official_sources (key, label, type, url, status, metadata, updated_at) VALUES (${sql(source.key)}, ${sql(source.label || source.key)}, ${sql(source.type || 'csv')}, ${sql(source.url || '')}, ${sql(source.status || 'pending')}, ${sql(JSON.stringify(source.metadata || {}))}, ${sql(now)}) ON CONFLICT(key) DO UPDATE SET label=excluded.label, type=excluded.type, url=excluded.url, status=excluded.status, metadata=excluded.metadata, updated_at=excluded.updated_at;`);
  }

  for (const snapshot of snapshotsPayload.snapshots || []) {
    statements.push(`INSERT OR IGNORE INTO app_snapshots (id, payload, source, created_at) VALUES (${sql(snapshot.id)}, ${sql(JSON.stringify({ source: snapshot.source || 'migration-render', migratedMetadataOnly: true }))}, ${sql(snapshot.source || 'migration-render')}, ${sql(snapshot.createdAt || now)});`);
  }
  for (const event of auditPayload.events || []) {
    statements.push(`INSERT OR IGNORE INTO audit_events (id, actor_name, actor_role, action, entity, entity_id, detail, metadata, created_at) VALUES (${sql(event.id)}, ${sql(event.actorName || '')}, ${sql(event.actorRole || '')}, ${sql(event.action || 'migration')}, ${sql(event.entity || 'migration')}, ${sql(event.entityId || '')}, ${sql(event.detail || '')}, ${sql(JSON.stringify(event.metadata || {}))}, ${sql(event.createdAt || now)});`);
  }
  for (const item of importsPayload.imports || []) {
    statements.push(`INSERT OR IGNORE INTO import_runs (id, source_key, rows_count, status, detail, created_at) VALUES (${sql(item.id)}, ${sql(item.sourceKey || '')}, ${Number(item.rowsCount || 0)}, ${sql(item.status || 'ok')}, ${sql(item.detail || '')}, ${sql(item.createdAt || now)});`);
  }
  fs.writeFileSync('.d1-seed.sql', `${statements.join('\n')}\n`, 'utf8');
  console.log(`Exportados ${Object.keys(store.appData).length} blocos de dados, ${(usersPayload.users || []).length} usuários, ${Object.keys(sources).length} fontes, ${(snapshotsPayload.snapshots || []).length} snapshots, ${(auditPayload.events || []).length} eventos e ${(importsPayload.imports || []).length} importações.`);

  const result = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['wrangler', 'd1', 'execute', database, '--remote', '--config=wrangler.worker.toml', '--file=.d1-seed.sql'], { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
  console.log('Dados migrados para o D1. O arquivo .d1-seed.sql permanece ignorado pelo Git.');
}

main().catch(error => { console.error(`Migração interrompida: ${error.message}`); process.exitCode = 1; });

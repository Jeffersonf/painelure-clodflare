import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const storageFile = path.join(root, 'server', 'storage', 'app-data.json');
const store = JSON.parse(fs.readFileSync(storageFile, 'utf8'));
const appData = store.appData || {};

const metrics = appData.schoolInventoryMetrics || {};
const assets = appData.schoolAssets || [];

console.log(`Sincronizando ${Object.keys(metrics).length} escolas e ${assets.length} ativos para o D1...`);

function sql(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}

const now = new Date().toISOString();
const payload = {
  version: 1,
  source: 'inventory-sync',
  updatedAt: now,
  appData
};

const payloadStr = JSON.stringify(payload);
const sqlFile = path.join(root, 'scratch', 'update-d1-inventory.sql');

const statements = [
  `INSERT INTO app_state (id, payload, source, updated_at) VALUES ('main', '', 'inventory-sync', ${sql(now)}) ON CONFLICT(id) DO UPDATE SET payload='', source='inventory-sync', updated_at=${sql(now)};`
];

const CHUNK_SIZE = 30000;
for (let i = 0; i < payloadStr.length; i += CHUNK_SIZE) {
  const chunk = payloadStr.slice(i, i + CHUNK_SIZE);
  statements.push(`UPDATE app_state SET payload = payload || ${sql(chunk)} WHERE id = 'main';`);
}

fs.mkdirSync(path.join(root, 'scratch'), { recursive: true });
fs.writeFileSync(sqlFile, statements.join('\n'), 'utf8');

console.log(`Gerado SQL com ${statements.length} instruções (${(fs.statSync(sqlFile).size / 1024).toFixed(1)} KB). Executando no D1 remoto...`);

const result = spawnSync('npx.cmd', [
  'wrangler',
  'd1',
  'execute',
  'painelure-cloudflare',
  `--file="${sqlFile}"`,
  '-y',
  '--remote'
], { cwd: root, encoding: 'utf8', shell: true, maxBuffer: 10 * 1024 * 1024 });

console.log(result.stdout || result.stderr);
if (result.status !== 0) {
  console.error('Falha ao sincronizar com o D1:', result.stderr);
  process.exit(1);
} else {
  console.log('✅ Sincronização com Cloudflare D1 concluída com sucesso!');
}

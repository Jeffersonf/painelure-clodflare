-- PainelURE Cloudflare: estado, autenticação e trilha operacional no D1.
CREATE TABLE IF NOT EXISTS app_state (
  id TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'api',
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS app_snapshots (
  id TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'api',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Consulta',
  contact_id TEXT,
  password_hash TEXT NOT NULL,
  avatar TEXT DEFAULT '',
  preferences TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'Consulta',
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS official_sources (
  key TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'csv',
  url TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  metadata TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS import_runs (
  id TEXT PRIMARY KEY,
  source_key TEXT,
  rows_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'ok',
  detail TEXT DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  actor_name TEXT DEFAULT '',
  actor_role TEXT DEFAULT '',
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  detail TEXT DEFAULT '',
  metadata TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_app_snapshots_created_at ON app_snapshots(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_import_runs_created_at ON import_runs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_user_time ON audit_events(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_events(entity, entity_id);

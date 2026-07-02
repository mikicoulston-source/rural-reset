CREATE TABLE IF NOT EXISTS signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  load TEXT,
  consent INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'rural-reset',
  ip TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at);

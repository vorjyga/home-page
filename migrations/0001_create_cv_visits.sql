CREATE TABLE IF NOT EXISTS cv_visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT NOT NULL DEFAULT '',
  user_agent TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT '',
  is_likely_bot INTEGER NOT NULL DEFAULT 0,
  visited_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cv_visits_tag_visited_at
  ON cv_visits (tag, visited_at DESC);

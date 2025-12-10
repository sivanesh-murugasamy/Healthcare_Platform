
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error(err);
  else console.log("SQLite database connected!");
});

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    filepath TEXT NOT NULL,
    filesize INTEGER NOT NULL,
    created_at TEXT NOT NULL
  )
`);

module.exports = db;

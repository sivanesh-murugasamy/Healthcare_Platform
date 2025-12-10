const express = require("express");
const multer = require("multer");
const db = require("../db");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Configure multer for PDF upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDFs are allowed!"));
    }
    cb(null, true);
  }
});

// -------------------------
// 1. UPLOAD PDF
// -------------------------
router.post("/upload", upload.single("file"), (req, res) => {
  const { filename, path: filepath, size } = req.file;
  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO documents (filename, filepath, filesize, created_at)
     VALUES (?, ?, ?, ?)`,
    [filename, filepath, size, created_at],
    function () {
      res.json({ message: "File uploaded", id: this.lastID });
    }
  );
});

// -------------------------
// 2. LIST ALL DOCUMENTS
// -------------------------
router.get("/", (req, res) => {
  db.all(`SELECT * FROM documents`, [], (err, rows) => {
    if (err) res.status(500).json({ error: err });
    else res.json(rows);
  });
});

// -------------------------
// 3. DOWNLOAD FILE
// -------------------------
router.get("/:id", (req, res) => {
  db.get(`SELECT * FROM documents WHERE id = ?`, [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ message: "File not found" });
    res.download(row.filepath, row.filename);
  });
});

// -------------------------
// 4. DELETE FILE
// -------------------------
router.delete("/:id", (req, res) => {
  db.get(`SELECT * FROM documents WHERE id = ?`, [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ message: "File not found" });

    fs.unlinkSync(row.filepath);

    db.run(`DELETE FROM documents WHERE id = ?`, [req.params.id], () => {
      res.json({ message: "File deleted" });
    });
  });
});

module.exports = router;

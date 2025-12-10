import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load documents
  const loadDocuments = async () => {
    const res = await axios.get("http://localhost:5000/documents");
    setDocuments(res.data);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  // Upload file
  const uploadFile = async () => {
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/documents/upload", formData);
    setFile(null);
    loadDocuments();
  };

  // Delete file
  const deleteFile = async (id) => {
    await axios.delete(`http://localhost:5000/documents/${id}`);
    loadDocuments();
  };

  // Filtering documents by filename
  const filteredDocs = documents.filter((doc) =>
    doc.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">📄 Patient Document Portal</h1>

      <div className="upload-card">
        <h2>Upload Medical PDF</h2>

        <input
          className="file-input"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="upload-btn" onClick={uploadFile}>
          Upload PDF
        </button>
      </div>

      {/* SEARCH BAR */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by filename..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h2 className="section-title">Uploaded Documents</h2>

      <table className="doc-table">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Size (KB)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.filename}</td>
                <td>{(doc.filesize / 1024).toFixed(2)}</td>
                <td>
                  <a
                    className="btn download"
                    href={`http://localhost:5000/documents/${doc.id}`}
                  >
                    Download
                  </a>

                  <button
                    className="btn delete"
                    onClick={() => deleteFile(doc.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                No documents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

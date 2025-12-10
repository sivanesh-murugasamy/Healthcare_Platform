Design Document – Patient Document Management Portal

A full-stack web application for uploading, viewing, searching, downloading, and deleting patient medical PDF documents.
This document explains the technology choices, architecture, API design, data flow, and assumptions followed during development.

1. Overview

This application simulates a simple patient portal used in healthcare platforms.
Users can:

Upload PDF documents

View all uploaded documents

Search documents

Download documents

Delete documents

The project uses a lightweight tech stack suitable for local development.

2. Tech Stack Choices
Frontend: React

Reasoning:

Component-based architecture

Excellent for dynamic UI updates (document list, search)

Easy API integration using Axios

Clean and responsive UI design

Backend: Node.js + Express

Reasoning:

Minimal setup for REST APIs

Multer simplifies file uploads

Works well with SQLite

Flexible routing and JSON handling

Database: SQLite

Reasoning:

File-based, no installation required

Extremely simple for local projects

Fits assignment requirement

Stores metadata efficiently

Database fields used:

id

filename

filepath

filesize

created_at

3. Architecture
System Diagram
React Frontend (User Interface)
        |
        |  Axios calls
        v
Express Backend (API Server)
        |
        ├── SQLite Database (stores metadata)
        |
        └── uploads/ folder (stores PDF files)

Flow Summary

React sends file uploads and document actions to Express.

Multer stores PDF files in /uploads.

SQLite stores metadata about each file.

Backend returns responses used to update the UI.

4. API Specification

Below is the full API design implemented.

POST /documents/upload

Upload a PDF file.

Request:
multipart/form-data with field "file"

Response:

{
  "message": "File uploaded",
  "id": 1
}

GET /documents

Fetch the list of all uploaded documents.

Response Example:

[
  {
    "id": 1,
    "filename": "report.pdf",
    "filesize": 20480,
    "created_at": "2025-01-10T12:45:20.000Z"
  }
]

GET /documents/:id

Downloads the document matching the given ID.

Response:
Binary file stream for download.

DELETE /documents/:id

Deletes the corresponding file and metadata record.

Response:

{
  "message": "File deleted"
}

5. Data Flow Description
File Upload Flow

User selects a PDF on the frontend.

React sends it to backend via FormData POST request.

Express validates file type and uploads using Multer.

File is saved in the /uploads/ folder.

Metadata (name, path, size, timestamp) is saved in SQLite.

Backend sends success response.

React reloads the document list.

File Download Flow

User clicks Download in the UI.

React opens /documents/:id.

Backend fetches file path from SQLite.

File is streamed back to the browser.

File Delete Flow

User clicks Delete.

React calls DELETE /documents/:id.

Backend deletes the file from uploads.

Metadata removed from SQLite.

Updated list is returned to the frontend.

6. Assumptions

No authentication is required (assignment states single-user environment).

Only PDF files are supported.

Maximum file size assumed reasonable (<10MB).

Error handling is minimal due to project scope.

Application is expected to run locally.

File versioning is not required.

uploads/ folder has read/write permissions.

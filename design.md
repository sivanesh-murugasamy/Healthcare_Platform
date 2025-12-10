
Design Document – Patient PDF Management Portal

1. Tech Stack Choices
Q1. Frontend Framework Used and Why?

I selected React for the frontend because:

It provides a fast, component-based architecture suitable for interactive UIs.

Managing UI state (file input, search filtering, dynamic table updates) is easy with React hooks.

It is widely used in modern full-stack assignments and offers clean integration with REST APIs.

React enables building a responsive and attractive interface with minimal code overhead.


Q2. Backend Framework Used and Why?

I chose Node.js with Express because:

Express is lightweight and ideal for building RESTful APIs.

It integrates smoothly with Multer for handling file uploads.

JavaScript allows sharing similar logic between frontend and backend.

Setup is simple, making it efficient for local development and assignment-based projects.


Q3. Database Used and Why?

I used SQLite, a file-based relational database, because:

It requires no dedicated server and works immediately in a local environment.

It is ideal for lightweight applications and local testing.

SQL support makes it suitable for storing structured metadata like filename, size, and timestamps.

The assignment also recommends SQLite as an option.


Q4. What changes would be needed to support 1,000+ users?

To scale this application for real-world multi-user usage:

Move Database to PostgreSQL or MySQL for better concurrency and performance.

Use Cloud Storage (AWS S3, Google Cloud Storage) instead of local uploads/ folder.

Add Authentication using JWT or OAuth.

Implement Role-Based Access Control to separate patients and admin users.

Add API Rate Limiting and Validation for security.

Deploy Backend on Scalable Services such as AWS Elastic Beanstalk or Docker containers.

Introduce Caching Layers (Redis) for faster file metadata retrieval.

__________________________________________________________________________________________________________________________________
2. System Flow Diagram

React Frontend
    |
    ↓
Express Backend (REST API)
    |
    ├── SQLite Database (stores metadata: id, filename, size, created_at)
    |
    └── uploads/ folder (stores actual PDF files)

Summary

The frontend handles file selection, searching, listing, and user actions.

The backend receives requests, processes file uploads using Multer, manages the database, and returns responses.

SQLite stores only metadata, while actual PDF files are kept in a local uploads/ directory.
__________________________________________________________________________________________________________________________________
3. API Specification

* POST /documents/upload

Description: Uploads a PDF file to the server.
Request Body: multipart/form-data containing field "file"
Response Example:

{
  "message": "File uploaded",
  "id": 1
}


Notes: Only PDF files are allowed via MIME-type validation.

* GET /documents

Description: Returns a list of all uploaded PDF metadata.
Response Example:

[
  {
    "id": 1,
    "filename": "report.pdf",
    "filesize": 24500,
    "created_at": "2025-01-10T12:45:20.000Z"
  }
]

* GET /documents/:id

Description: Downloads a specific PDF file based on ID.
Response: File stream download.

* DELETE /documents/:id

Description: Deletes both the PDF file and its metadata record.
Response Example:

{
  "message": "File deleted"
}
__________________________________________________________________________________________________________________________________


4. Data Flow Description

Q5. Upload Process — Step-by-Step

User selects a PDF file on the React frontend.

React sends the file using a POST request with FormData.

Express receives the request and Multer:

Validates the file type (must be PDF).

Saves the file inside the /uploads folder.

Backend extracts metadata (filename, path, size, timestamp).

Metadata is inserted into SQLite database.

Backend returns a success message and new document ID.

Frontend reloads the document list and displays updated data.



Q6. Download Process — Step-by-Step

User clicks the Download button in the table.

React triggers a GET request to /documents/:id.

Backend retrieves file path from SQLite.

The file is streamed back to the browser as a download.

Delete Process (Additional Feature)

User clicks Delete on a document.

Frontend sends DELETE request to backend.

Backend deletes the file from uploads/.

Corresponding metadata is removed from SQLite.

Updated document list is returned.

__________________________________________________________________________________________________________________________________

5. Assumptions

Q6. List of Assumptions

Authentication is not required (assignment states "assume one user").

Only PDF uploads are allowed.

File size is assumed to be within reasonable limits (e.g., <10 MB).

Application runs entirely on local machine.

uploads/ folder is accessible and has write permissions.

Concurrency requirements are minimal since the project is assignment-level.

No versioning of documents is needed.

__________________________________________________________________________________________________________________________________
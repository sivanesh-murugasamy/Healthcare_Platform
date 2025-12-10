# Healthcare_Platform
A healthcare platform wants to build a patient portal where users (patients) can upload and manage their medical documents (PDFs). These could include prescriptions, test results, or referral notes.


# Patient Document Management Portal

A full-stack web application that allows users to upload, view, search, download, and delete medical PDF documents.  
Built using **React (frontend)**, **Node.js + Express (backend)**, **SQLite (database)**, and local storage for file uploads.

---

## 🚀 Features

- Upload PDF documents
- List all uploaded documents
- Search documents by filename
- Download PDF files
- Delete documents
- Attractive and responsive user interface

---

## 🛠 Tech Stack

### **Frontend**
- React
- Axios
- Custom CSS

### **Backend**
- Node.js
- Express.js
- Multer (PDF uploads)
- SQLite (Database)
- CORS

---

## 📂 Project Structure

```
patient-portal/
   ├── backend/
   │      ├── server.js
   │      ├── db.js
   │      ├── routes/
   │      │      └── documents.js
   │      ├── uploads/ (Created Automatically)
   │      └── package.json
   │
   ├── frontend/
   │      ├── src/
   │      │     ├── App.js
   │      │     ├── App.css
   │      └── package.json
   │
   ├── design.md
   └── README.md
```

---

# 🧩 How to Run the Project

## 1. Clone the Repository

```
git clone <your-repo-link>
cd Healthcare_Platform
```

---

# ▶️ **Backend Setup**

Navigate into the backend folder:

```
cd backend
```

### Install dependencies:

```
npm install
```

### Start the backend:

```
node server.js
(or)
npm start
```

Backend will start at:

```
http://localhost:5000
```

---

# 💾 **Database**

SQLite database file (`database.db`) is automatically created when you start the backend.

---

# 🎨 **Frontend Setup**

Open a second terminal window and navigate to frontend:

```
cd frontend
```

### Install dependencies:

```
npm install
```

### Start the React app:

```
npm start
```

Frontend will open at:

```
http://localhost:3000
```

---

# 📌 Usage Instructions

1. Open the frontend in your browser:  
   **http://localhost:3000**

2. Use the **Upload PDF** section to choose and upload a document.

3. View all uploaded files in the table below.

4. Use the **search bar** to filter documents by name.

5. Click **Download** to download a file.

6. Click **Delete** to remove a file from the system.

---

# 📡 API Endpoints

### **POST /documents/upload**
Upload a PDF file.

### **GET /documents**
Get all document metadata.

### **GET /documents/:id**
Download a specific PDF.

### **DELETE /documents/:id**
Delete a document and its metadata.

---

# 🙌 Credits

Developed by **[Your Name]** as part of a full-stack assessment project.

---

# 📄 License

This project is open-source and free to use.

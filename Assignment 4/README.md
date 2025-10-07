# 🌐 My-Blog Project (Assignment 4)

A full-stack web application built using the **MERN Stack** — **MongoDB**, **Express.js**, **React.js**, and **Node.js**.

This project is divided into two parts:
- **Client (Frontend)** – React.js + TailwindCSS
- **Server (Backend)** – Node.js + Express.js + MongoDB

---
## 📁 Project Structure

Assignment 4/
│
├── client/ # React frontend
│ ├── src/
│ ├── package.json
│ └── ...
│
├── server/ # Express backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── app.js
│ ├── package.json
│ └── ...
│
└── README.md


---

## ⚙️ Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas cloud instance)
- npm or yarn




---

## 🧩 Installation Steps

### 1️⃣ Clone the Repository

 - git clone https://github.com/nirav07dholiya/Pixerfect-Internship.git
 - cd Assignment 4

Install server dependencies:

 - cd server
 - npm install

Install client dependencies:

 - cd ../client
 - npm install



---

##🚀 Running the Project

### ▶️ Start the Server

 - npm run dev

The backend will start (by default) on http://localhost:8000

You can change the port inside .env (see below).

### 💻 Start the Client

 - npm run dev

The React app will run on http://localhost:5173



---

## 🔐 Environment Variables

### Create a .env file inside the server/ directory with the following variables:

 - database_url = 'mongodb://localhost:27017/my-blog' 
 - PORT = 8000 
 - ORIGIN = 'http://localhost:5173'  
 - JWT_SECRET_KEY = 'duwhu#@$%^&h2dekwdmblkwndfw'  


### If your client also needs environment variables (e.g., API URL), create a .env inside the client/ folder:

 - VITE_SERVER_URL = 'http://localhost:8000'

Use import.meta.env.VITE_API_URL in your React code to access it (for Vite projects).

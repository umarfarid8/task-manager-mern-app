# MERN Stack Task Manager App

A clean, lightweight, and fully functional Full-Stack Task Management application built from scratch. This project demonstrates a decoupled architecture integrating a React frontend with a Node.js/Express backend and a cloud-hosted MongoDB Atlas database.

## 🚀 Features

- **Full CRUD Operations:** Create, Read, Update (Toggle Complete/Pending), and Delete tasks seamlessly without page reloads.
- **Decoupled Architecture:** Completely separated frontend and backend structures for better scalability and maintenance.
- **Cloud Database Integration:** Fully integrated with MongoDB Atlas for persistent cloud storage.
- **Environment Security:** Hardcoded credentials have been completely eliminated using environment variables (`dotenv`) to mirror production-grade safety standards.
- **Modern Tech Patterns:** Utilizes state management with React Hooks (`useState`, `useEffect`) and handled client-server communication using Axios.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Axios (API Client)
- JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- Mongoose (Object Data Modeling)
- Dotenv (Environment Security)

**Database:**
- MongoDB Atlas (Cloud)

---

## 📂 Project Structure

```text
task-manager-app/
├── backend/
│   ├── models/
│   │   └── Tasks.js
│   ├── .env (Ignored by Git)
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── .gitignore

```

---

## 🔧 Installation & Local Setup

Follow these simple steps to run this project locally on your machine:

### 1. Clone the Repository

```bash
git clone [https://github.com/YOUR_USERNAME/task-manager-mern-app.git](https://github.com/YOUR_USERNAME/task-manager-mern-app.git)
cd task-manager-mern-app

```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend

```


2. Install the required dependencies:
```bash
npm install

```


3. Create a `.env` file in the root of the `backend/` folder and add your MongoDB Atlas connection string:
```text
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.uroq4ro.mongodb.net/taskDB?retryWrites=true&w=majority

```


4. Start the backend server:
```bash
node server.js

```


*The server will start successfully on `http://localhost:5000*`

### 3. Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend

```


2. Install the necessary node packages:
```bash
npm install

```


3. Run the development server:
```bash
npm run dev

```


*The frontend application will boot up smoothly on `http://localhost:5173*`

---

## 💡 Key Learnings from this Project

* Abstracting database operations using structural schemas via Mongoose.
* Managing lifecycle state and rendering asynchronous data dynamic arrays inside React.
* Securing application access keys and database credentials away from version control systems.

```

```

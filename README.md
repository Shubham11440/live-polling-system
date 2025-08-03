# Live Polling & Quiz System

This project is a feature-rich, real-time polling and quiz application built for the SDE Intern Assignment from **Intervue.io**. It features two distinct roles, Teacher and Student, and facilitates a live, interactive classroom or presentation environment. The application is built with a modern tech stack and includes numerous features beyond the core requirements.

---

## 🚀 Live Demo

* **Frontend (Client):** `[YOUR_HOSTED_FRONTEND_URL]`
* **Backend (Server):** `[YOUR_HOSTED_BACKEND_URL]`

---

## ✨ Features

This application successfully implements all requirements from the assignment document, including all "Good to Have" and "Bonus" features.

### Core Features
- **Dual User Roles:** Separate and distinct interfaces for Teacher and Student personas.
- **Live Poll Creation:** Teachers can create polls in real-time.
- **Real-Time Voting:** Students can submit their answers, with results updated live for everyone.
- **Detailed Results:** View vote counts, percentages, and a list of which student voted for each option.
- **Late Joiner Support:** Students who join after a poll has started will immediately see the active question.

### "Good to Have" Features Implemented
- ✅ **Configurable Time Limit:** Teachers can set a custom duration (in seconds) for each question.
- ✅ **Remove a Student:** Teachers have a dashboard of connected students and can remove any student from the session. The removed student is notified.
- ✅ **Well-Designed User Interface:** A clean, responsive, and intuitive UI for a smooth user experience.

### "Bonus Features" Implemented
- ✅ **Real-Time Chat:** A fully functional chat popup allows the teacher and students to communicate during the session.
- ✅ **Poll History:** Teachers can view the results of all previously asked multiple-choice questions.

### Additional Features
- **Multiple Question Types:** Teachers can create both **Multiple Choice** and **Written Answer** questions.
- **Correct Answer Indication:** For multiple-choice quizzes, teachers can mark a correct answer, and students receive instant visual feedback (green/red) after the poll ends.
- **Live Written Submissions:** Teachers can see written answers appear live on their dashboard as students submit them.

---

## 🛠️ Technology Stack

- **Frontend:**
  - **React.js:** For building the user interface.
  - **Tailwind CSS:** For styling the application.
  - **Socket.io-Client:** To manage real-time communication with the server.
  - **React Router:** For client-side routing.
- **Backend:**
  - **Node.js:** As the JavaScript runtime environment.
  - **Express.js:** As the web server framework.
  - **Socket.io:** For enabling real-time, bidirectional event-based communication.
- **Development:**
  - **Concurrently:** To run both the client and server with a single command.

---

## 📂 Project Structure

The project is organized into two main parts within a monorepo structure:

```
live-polling-system/
├── client/         # Contains the React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
├── server/         # Contains the Node.js, Express, and Socket.io backend
│   ├── index.js
│   └── package.json
└── package.json    # Root package.json for running both concurrently
```

---

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

**1. Clone the repository:**
```bash
git clone [https://github.com/Shubham11440/live-polling-system.git](https://github.com/Shubham11440/live-polling-system.git)
cd live-polling-system
```

**2. Install server dependencies:**
```bash
npm install --prefix server
```

**3. Install client dependencies:**
```bash
npm install --prefix client
```

**4. Run the application:**
From the **root directory**, run the following command to start both the backend and frontend servers concurrently:
```bash
npm run dev
```
- The client will be available at `http://localhost:5173`.
- The server will be running on `http://localhost:4000`.

---

## 📖 How to Use

1.  **Student:**
    - Open a browser tab and navigate to the application.
    - Click "I'm a Student".
    - Enter your name and click "Join".
    - You will now see the main screen, where you can wait for questions, answer them, and use the chat.

2.  **Teacher:**
    - Open a separate browser tab and navigate to the application.
    - Click "I'm a Teacher".
    - Use the dashboard to create either Multiple Choice or Written Answer questions.
    - Set a duration, fill in the details, and click "Ask Question".
    - Monitor live results, view the poll history, manage connected students, and interact via chat.

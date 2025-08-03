# Live Polling & Quiz System

This project is a feature-rich, real-time polling and quiz application built for the SDE Intern Assignment from **Intervue.io**. It features two distinct roles, Teacher and Student, and facilitates a live, interactive classroom or presentation environment. The application is built with a modern tech stack and includes numerous features beyond the core requirements.

---

## 🚀 Live Demo

* **Frontend (Deployed on Netlify):** [https://live-polling-system-shubh.netlify.app/](https://live-polling-system-shubh.netlify.app/)
* **Backend (Deployed on Render):** [https://live-polling-system-n73u.onrender.com](https://live-polling-system-n73u.onrender.com)



[screen-capture.webm](https://github.com/user-attachments/assets/ca998aa9-2ea2-4321-af42-059d6ff81da0)


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

## 🔮 Future Scope & Improvements

This project provides a solid foundation that can be extended with several powerful features to create a complete educational tool. The following are planned for future development:

1.  **User Authentication & Persistent Profiles:**
    * **Implementation:** Replace the current session-based name entry with a full-fledged user authentication system (Login/Register).
    * **Technology:** Integrate a SQL database like **PostgreSQL** or **MySQL** to store user credentials and profiles.
    * **Benefit:** This will allow students and teachers to have persistent accounts, track their long-term performance, and save created quizzes.

2.  **Advanced Quiz Sessions & Scoring:**
    * **Implementation:** Allow teachers to group multiple questions into a named "Quiz Session."
    * **Benefit:** Instead of asking one-off questions, a teacher could launch a complete, pre-made quiz. The system would automatically track scores for each student throughout the session and display a final leaderboard.

3.  **Enhanced Teacher Analytics Dashboard:**
    * **Implementation:** Create a new dashboard page where teachers can view detailed analytics for past sessions.
    * **Benefit:** Teachers could see question-by-question performance for the whole class (e.g., "70% of students got Question 3 wrong"), identify difficult topics, and track individual student progress over time.

4.  **Support for More Question Types:**
    * **Implementation:** Add support for other answer formats like "True/False" or polls where students can select multiple correct options.
    * **Benefit:** This would provide teachers with greater flexibility in creating engaging content for their students.

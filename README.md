# 🛠️ Service Desk Application – Issue Reporting and Tracking System

A full-stack web application that enables users to **report, track, and manage issues efficiently**. This Service Desk system was built using **React.js**, **Node.js**, and **MongoDB** and designed with a focus on **real-time issue tracking**, **backend integration**, and a **user-friendly interface**.

---

## 🚀 Features

- 📝 Submit issues with details such as category, description, and priority
- 📊 Track issue status (e.g., Open, In Progress, Resolved, Closed)
- 👥 User authentication and role-based access (Admin/User)
- 📬 Notifications for issue updates
- 🔎 Filter and search issues by status, priority, or keyword
- 📈 Dashboard view for quick insights

---

## 💻 Tech Stack

### Frontend:
- React.js
- Redux Toolkit
- Axios
- CSS

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis (JWT storage)
- bcrypt for password hashing

---

## 🔑 JWT & Redis Integration

Redis is used to store session tokens (JWTs) for better performance and scalability. Helper functions:
- `setJWT(key, value)`
- `getJWT(key)`
- `deleteJWT(key)`

---

## 🔄 Password Reset Flow
1. User requests OTP.
2. OTP is validated and matched.
3. On success, the user resets the password.

---


## 📸 Screenshots
![Login](https://github.com/user-attachments/assets/b4b6c623-56f3-4158-a908-c5b1247c838d)

![Dashboard](https://github.com/user-attachments/assets/712b99fc-d7e8-449d-b46d-7eee9db136c3)

![Ticket listing](https://github.com/user-attachments/assets/8f4b47ca-332c-4777-b9e5-bea03034d55b)

![Add New Tickt](https://github.com/user-attachments/assets/23ad0924-51c5-4115-9ee3-2724cd4e04de)

![Reply Ticket](https://github.com/user-attachments/assets/c8e5527a-65a7-4de7-9693-fdd170493ce5)

![Forgot Password](https://github.com/user-attachments/assets/44da07db-ba70-4201-b16b-4c0cc4f5c948)

![OTP verification & Password Reset](https://github.com/user-attachments/assets/de339bea-5c8d-4592-95e1-54de83debc21)



---

## 📂 Folder Structure
FRONTEND-

![image](https://github.com/user-attachments/assets/0309fdc6-05db-4ec4-9339-45f7ecbbe49d)


BACKEND-

![image](https://github.com/user-attachments/assets/dc1d5702-f1aa-4c5d-a20b-255e96ad623c)


## ⚙️ How to Run the Project

### 🧩 Prerequisites
- Node.js
- MongoDB
- Redis
- npm

---
### 🔧 Setup

```bash
# Backend
cd client-api
npm install
node app.js

# Frontend
cd frontend
npm install
npm start
### 🔧 Setup

```bash
# Backend
cd client-api
npm install
node app.js

# Frontend
cd frontend
npm install
npm start

---
✨ Future Enhancements
🔔 Real-time Notifications using Socket.IO for instant ticket updates, replies, and escalations.

📊 Analytics Dashboard to show charts and metrics like ticket resolution time, ticket count by category, and user activity.

🧠 AI-based Ticket Tagging using NLP to auto-categorize tickets by content.

🎯 SLA Management to set ticket response/resolution deadlines and track SLA violations.

🌐 Multi-role Access Control with distinct views and permissions for Admin, Staff, and Users.

📁 File Attachment Support so users can upload screenshots or logs with their issue.


---
👩‍💻 Developer
Sweeti Kumari
📧 sweeti754940@gmail.com
🔗 https://www.linkedin.com/in/sweeti-kumari-254850259/

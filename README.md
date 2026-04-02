# Finance Data Processing and Access Control Backend

## 📌 Overview
This project is a backend system for managing financial records with role-based access control. It supports user authentication, CRUD operations on financial data, and dashboard-level analytics.

## 🎯 Objective
To design a clean and maintainable backend system that demonstrates API structuring, role-based access control, and financial data processing.

---


## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication

### 👥 Role-Based Access Control
- **Viewer**: Can view records
- **Analyst**: Can view records + summary
- **Admin**: Full access (create, update, delete)

### 💰 Financial Records
- Create, read, update, delete records
- Fields: amount, type, category, date, notes
- User-specific data handling

### 📊 Dashboard Summary
- Total Income
- Total Expense
- Net Balance

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## 📂 Project Structure
controllers/
middleware/
models/
routes/
server.js
   
---

## ⚙️ Setup Instructions

1. Clone the repository   
```bash
git clone https://github.com/nighaar07/Finance-Data-Processing-and-Access-Control-Backend.git
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
   MONGO_URI=your_mongodb_connection
   JWT_SECRET=your_secret_key
   ```

4. Run the server
```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Records
- GET /api/records
- POST /api/records
- PUT /api/records/:id
- DELETE /api/records/:id

### Summary
- GET /api/records/summary

---

## 🔐 Authorization
All protected routes require:
```http
 Authorization: <JWT_TOKEN>
 ```

---

## 🧠 Assumptions
- Each user can only access their own records
- Roles define access permissions
- Basic validation is implemented

---

## 📌 Notes
This project focuses on backend design, clean structure, and logical implementation rather than production-level deployment.

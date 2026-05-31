# CreditSea Loan Management System

A full-stack Loan Management System built with **Next.js, TypeScript, Node.js, Express, MongoDB, and JWT Authentication**. The application supports multiple user roles and a complete loan processing workflow from application to disbursement.

## Live Demo

### Frontend

https://creditsea-assn.vercel.app

### Backend API

https://creditsea-assn-3.onrender.com

---

## Features

### Authentication & Authorization

* JWT-based authentication
* Role-based access control
* Secure login and registration
* Protected routes

### Borrower Module

* User registration and login
* Apply for loans
* View loan application status
* Track approval process

### Admin Module

* View all loan applications
* Review borrower details
* Approve or reject applications
* Manage loan lifecycle

### Sanction Module

* Review approved applications
* Sanction loans
* Update loan status

### Disbursement Module

* Process sanctioned loans
* Complete loan disbursement
* Track disbursed loans

---

## Demo Credentials

Use the following accounts to test the application without registering new users.

| Role                 | Email                                                 |
| -------------------- | ----------------------------------------------------- |
| Borrower             | [borrower@test.com](mailto:borrower@test.com)         |
| Admin                | [admin@test.com](mailto:admin@test.com)               |
| Sanction Officer     | [sanction@test.com](mailto:sanction@test.com)         |
| Disbursement Officer | [disbursement@test.com](mailto:disbursement@test.com) |

**Password:** 123456



## Tech Stack

### Frontend

* Next.js
* TypeScript
* Twinland CSS

### Backend

* Node.js
* Express.js
* TypeScript
* JWT Authentication
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Project Structure

```bash
Creditsea-ASSN/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── seed.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── admin/
│   │   ├── borrower/
│   │   ├── disbursement/
│   │   ├── login/
│   │   ├── register/
│   │   └── sanction/
│   │
│   └── package.json
│
└── README.md
```

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/YuvaBalaji01/Creditsea-ASSN.git
cd Creditsea-ASSN
```

### Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
```

Run development server

```bash
npm run dev
```

Build project

```bash
npm run build
```

Start production server

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run development server

```bash
npm run dev
```

Build project

```bash
npm run build
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Borrower

Apply for a loan

```http
POST /api/loan/apply
```

Get all loan applications submitted by the logged-in borrower

```http
GET /api/loan/my-applications
```

### Admin

Get all loan applications

```http
GET /api/loan/all
```

Approve or reject loan applications

```http
PUT /api/loan/:id/status
```

### Sanction

Sanction approved loans

```http
PATCH /api/sanction/:id
```

### Disbursement

Disburse sanctioned loans

```http
PATCH /api/disbursement/:id
```

## Workflow

1. Borrower submits loan application.
2. Admin reviews application.
3. Admin approves or rejects loan.
4. Sanction officer sanctions approved loans.
5. Disbursement officer disburses sanctioned loans.
6. Final loan status is updated in the system.

---

## Author

**Yuva Balaji**

This project is developed as part of the CreditSea Full Stack Assignment.

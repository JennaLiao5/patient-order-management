# Order Management System

A simple **Order Management System** with **frontend (React + MUI)** and **backend (Node.js + Express + Prisma + PostgreSQL)**.  
The frontend provides order listing and editing UI, while the backend handles API services and data storage.  

---

## Overview
- **Frontend (React)**  
  - Built with React + Material UI  
  - Supports displaying, editing, saving orders  

- **Backend (Express + Prisma)**  
  - REST API with Express  
  - PostgreSQL integration via Prisma  
  - Supports **Create, Read, Update** for orders  

- **Features**
  - List existing orders
  - Edit and update orders  
  - Seeder creates 5 patients and sample orders

---

## Requirements
- **Node.js**: v18+  
- **npm / yarn**: latest  
- **PostgreSQL**: v14+  
  - You must manually create a database (e.g., `patients_orders`)  

---

## Setup & Run

### 1. Clone the project
```bash
git clone https://github.com/JennaLiao5/patient-order-management.git
cd patient-order-management
```

---

### 2. Create PostgreSQL database
Log in to PostgreSQL and create a database:
```sql
CREATE DATABASE patients_orders;
```

---

### 3. Backend setup
```bash
cd backend
npm i
```

Copy `.env.example` and update `DATABASE_URL`:
```bash
cp .env.example .env
```

Initialize Prisma:
```bash
npm run prisma:gen      # Generate Prisma Client
npm run prisma:push     # Apply schema (create tables)
npm run prisma:seed     # Insert 5 patients + sample orders
```

Run backend:
```bash
npm run dev
```
The server will be available at `http://localhost:4000`

---

### 4. Frontend setup
```bash
cd ../frontend
npm i
```

Copy `.env.example`
```bash
cp .env.example .env
```

Run frontend:
```bash
npm start
```
The frontend will be available at `http://localhost:3000`

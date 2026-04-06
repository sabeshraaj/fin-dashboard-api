# Finance Backend

A robust backend service for managing financial records, user authentication, and role-based access control. Built with a secure architecture for financial data entry and aggregated analytics for dashboard consumption.

---

## Table of Contents

- [Architecture & Tech Stack](#architecture--tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [API Reference](#api-reference)
- [Testing & Proof of Work](#testing--proof-of-work)

---

## Architecture & Tech Stack

The server runs on **Node.js** with **Express.js** as the web framework. Data is persisted in a **PostgreSQL** database and accessed through **Prisma** as the ORM. Authentication is handled using **JSON Web Tokens (JWT)** for stateless session management, and passwords are securely hashed with **Bcrypt**.

---

## Project Structure

```
finance-backend/
├── prisma/
│   └── schema.prisma
├── results/                  # Postman testing evidence
├── src/
│   ├── controllers/          # Business logic
│   ├── middleware/           # JWT auth and RBAC guards
│   ├── routes/               # Express route definitions
│   ├── app.js                # Main application entry point
│   └── prisma.js             # Prisma client instantiation
├── .env                      # Environment variables (git-ignored)
└── package.json
```

---

## Prerequisites

Ensure the following are installed on your machine before proceeding:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- npm (bundled with Node.js)

---

## Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root and add the following:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/finance_db"
JWT_SECRET="your_secure_secret_key"
```

### 3. Initialize the Database

Generate the Prisma client and push the schema to your PostgreSQL instance:

```bash
npx prisma generate
npx prisma db push
```

### 4. Start the Server

```bash
node src/app.js
```

The server will be available at `http://localhost:3000`.

---

## API Reference

### Authentication

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Authenticate and receive a JWT

### Financial Records

All routes below require a valid JWT passed as `Authorization: Bearer <token>`.

- `GET /records` — Retrieve records. Supports optional query filters: `type`, `category`, `startDate`, and `endDate`
- `POST /records` — Create a new financial record
- `PUT /records/:id` — Update an existing record
- `DELETE /records/:id` — Soft-delete a record

### Dashboard Analytics

All routes below require a valid JWT passed as `Authorization: Bearer <token>`.

- `GET /dashboard/summary` — Returns the net balance, total income, and total expenses
- `GET /dashboard/category` — Returns aggregated totals grouped by category

---

## Testing & Proof of Work

The following documents the functionality and security validation of the API using Postman and direct database interactions. All screenshots are stored in the `results/` directory.

### Standard API Flow

**1. User Registration** 
 
![Demonstrates successful user creation, triggering bcrypt password hashing and database insertion](results/image1.jpeg)
 
**2. User Authentication**

![Demonstrates successful login and the generation of a valid JWT](results/image2.jpeg)
 
**3. Record Creation**
 
![Demonstrates authorized access to a protected route to insert financial data](results/image3.jpeg)
 
**4. Record Retrieval**
  
![Demonstrates the retrieval of records scoped to an authenticated user](results/image4.jpeg)
  
**5. Manual Database Insertion**
  
![A user is inserted directly into PostgreSQL via the terminal, bypassing the API and password hashing entirely](results/image5.png)
 
**6. Registration Conflict Handling**

![Attempting to register the manually created user via the API returns a proper conflict error, preventing sequence collisions](results/image6.jpeg)
 
**7. Authentication Block (Bcrypt Validation)**

![Login attempt for the manually inserted user fails. The API correctly rejects the raw-text password because it doesn't match the expected bcrypt hash format](results/image7.jpeg)
 
**8. Database Cleanup**
 
![The invalid manually inserted record is removed from the database to restore sequence integrity](results/image8.jpg)
 
**9. API Registration Correction**
 
![The user is re-registered through the proper API endpoint, ensuring the password is hashed and the database sequence is correctly updated](results/image9.jpg)
# Library Management System

A comprehensive backend system for managing library operations including books, users, and borrowing activities.
This is a RESTful API for a Library Management System built with Node.js, Express, TypeScript, Prisma ORM, and Redis for caching.

## Tech Stack

- Node.js
- TypeScript
- Express
- Database (PostgreSQL)

  ## Features

- User authentication (register, login, email verification)
- Book management (add, edit, delete, search)
- Borrowing and returning books
- Fine calculation and payment
- User management
- Analytics (most borrowed books, monthly usage reports)
- Role-based access control (Admin and Member roles)
- Redis caching for improved performance
-  Automated email reminders for book return deadlines

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- Docker and Docker Compose

## Project Structure

```
/src
  /controllers    - Request handlers
  /models        - Database models and types
  /routes        - API route definitions
  /middlewares   - Custom middleware functions
  /services      - Business logic
  /config        - Configuration files
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and update the values.


4.  .env.example will have:
```bash
DATABASE_URL="your-db-url"
JWT_SECRET="your secret"
NODE_ENV=development
PORT=3000
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting

## API DOCS:
I have created a Postman collection documenting all the API endpoints for our Library Management System. I have  provided  a JSON file that you can import into Postman.



To use this Postman collection:

1. Open Postman
2. Click on "Import" in the top left corner
3. Choose "Raw text" and paste the entire JSON content
4. Click "Import"


This collection includes all the API endpoints we've implemented, organized into folders for easy navigation:

1. Authentication

- Register
- Login
- Verify Email



2. Books

- Add Book
- Update Book
- Delete Book
- Get Book by ISBN
- Search Books



3. Users

- Get User Details
- Toggle User Account



4. Borrowing

- Borrow Book
- Return Book



5. Payments

- Pay Fine
- Generate Invoice


6. Analytics

1. Most Borrowed Books
2. Monthly Usage Report

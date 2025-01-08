# Library Management System

A comprehensive backend system for managing library operations including books, users, and borrowing activities.

## Tech Stack

- Node.js
- TypeScript
- Express
- Database (PostgreSQL)

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

3. Run development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting
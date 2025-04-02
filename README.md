# Gaming Shop Website

A full-stack web application for a gaming shop with booking system and e-commerce functionality.

## Features

- User Authentication (Login/Register)
- Gaming Station Booking System
- E-commerce Platform for Games and Consoles
- Admin Dashboard
- Order Management
- Booking Management

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Project Structure

```
gaming-shop/
├── frontend/          # React frontend
├── backend/           # Node.js backend
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── server.js     # Server entry point
└── README.md
```

## Setup Instructions

1. Install MongoDB on your system
2. Clone the repository
3. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
4. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```
5. Create a .env file in the backend directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/gaming-shop
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
6. Start the backend server:
   ```
   cd backend
   npm run dev
   ```
7. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

The application will be available at http://localhost:3000

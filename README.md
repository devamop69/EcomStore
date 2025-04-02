# Gaming Zone E-commerce Application

A modern e-commerce platform for gaming products built with React and Node.js.

## Features

- User authentication (login/register)
- Product browsing and searching
- Shopping cart functionality
- Secure checkout process
- Admin dashboard for product management
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- Redux for state management
- Material-UI for styling
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB for database
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jaswanth119/GamingZoneEcom.git
cd GamingZoneEcom
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create a .env file in the backend directory with:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/gaming-shop
JWT_SECRET=your_secret_key
```

5. Start the backend server:
```bash
cd backend
npm start
```

6. Start the frontend development server:
```bash
cd frontend
npm start
```

The application should now be running at `http://localhost:3000`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookings.js';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Memory Server
const startServer = async () => {
  try {
    // Create data directory if it doesn't exist
    const dataDir = `${__dirname}/data`;
    try {
      await mkdir(dataDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        console.error('Error creating data directory:', error);
      }
    }

    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri);
    console.log('MongoDB Memory Server Connected');

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/bookings', bookingRoutes);

    // Base route
    app.get('/', (req, res) => {
      res.send('API is running...');
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode);
      res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      });
    });

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server Error:', error);
  }
};

startServer();

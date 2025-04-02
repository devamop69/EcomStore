import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '30d'
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email }); // Debug log

    const user = await User.findOne({ email });
    console.log('User found:', user ? 'yes' : 'no'); // Debug log

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Debug logs for password comparison
    console.log('Comparing passwords...');
    console.log('Input password:', password);
    console.log('Stored hashed password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Debug log

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '30d'
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;

import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = `${__dirname}/../data/db.json`;

const readDB = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.email === email);

    if (user && await bcrypt.compare(password, user.password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: jwt.sign({ id: user._id }, 'your-jwt-secret', { expiresIn: '30d' }),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = readDB();

    if (db.users.some(u => u.email === email)) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    };

    db.users.push(newUser);
    writeDB(db);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: jwt.sign({ id: newUser._id }, 'your-jwt-secret', { expiresIn: '30d' }),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { loginUser, registerUser };

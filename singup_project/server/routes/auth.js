const express = require('express');
const User = require('../models/User');
// const jwt = require('jsonwebtoken');
const router = express.Router();
const LoginRecord = require('../models/LoginRecord');

// Hardcoded secret key for development/testing
// const JWT_SECRET = 'your-hardcoded-secret';

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, confirmPassword, imageUrl } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      username,
      email,
      password, // Store password as plain text
      confirmPassword,
      imageUrl,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const loginRecord = new LoginRecord({
      email: user.email,
      password: user.password,
    });

    await loginRecord.save();

    res.json({
      loginRecord, 
      message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

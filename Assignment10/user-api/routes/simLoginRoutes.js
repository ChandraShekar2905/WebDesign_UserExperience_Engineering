const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Secret key for JWT (move to .env in production)
const SECRET_KEY = 'your_secret_key';

// Simulated user database (from assignment 9)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// Login endpoint from server.js
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username }, 
    SECRET_KEY, 
    { expiresIn: '1h' }
  );
  
  // Don't send the password back
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({
    message: 'Login successful',
    user: userWithoutPassword,
    token
  });
});

module.exports = router;
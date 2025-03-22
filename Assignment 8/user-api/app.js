const express = require('express');
const path = require('path');
const multer = require('multer'); 
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const getUserRoutes = require('./routes/getUserRoutes');
require('dotenv').config();

// Initialize express
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Serve static files (for image access)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/user', userRoutes);
app.use('/getUser', getUserRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('User API Server is Running');
});

// Error handling middleware - MOVED AFTER ROUTES
app.use((err, req, res, next) => {
  // Handle Multer errors
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  
  // Handle file filter errors
  if (err.message && err.message.includes('file format')) {
    return res.status(400).json({ error: err.message });
  }
  
  // Handle other errors
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
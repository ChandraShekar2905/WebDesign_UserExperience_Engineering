
const express = require('express');
const path = require('path');
const multer = require('multer'); 
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const getUserRoutes = require('./routes/getUserRoutes');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const simLoginRoutes = require('./routes/simLoginRoutes');
const companyRoutes = require('./routes/companyRoutes');
const cors = require('cors');
require('dotenv').config();

// Initialize express
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Your React app URL
  credentials: true
}));

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/login', simLoginRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Your React app URL
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Serve static files (for image access)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

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
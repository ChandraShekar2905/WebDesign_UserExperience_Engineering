const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true
}));

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

app.post('/api/test', (req, res) => {
  console.log('Received POST request:', req.body);
  res.json({ message: 'POST request successful', data: req.body });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`CORS test server running on port ${PORT}`);
});
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

// Authentication middleware (from server.js)
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    req.user = user;
    next();
  });
}

// Companies data (from server.js)
const companies = [
  {
    id: 1,
    name: "TechVision Inc.",
    imagePath: "/images/techvision.png",
    description: "Leading innovator in software development."
  },
  {
    id: 2,
    name: "Global Marketing Partners",
    imagePath: "/images/gmp.png",
    description: "Strategic marketing agency specializing in brand development."
  },
  {
    id: 3,
    name: "DesignCraft Studios",
    imagePath: "/images/designcraft.png",
    description: "Creative design studio focusing on user experience and digital design."
  },
  {
    id: 4,
    name: "DataMind Analytics",
    imagePath: "/images/datamind.png",
    description: "Data science and analytics firm providing insights to Fortune 500 companies."
  },
  {
    id: 5,
    name: "CustomerFirst Support",
    imagePath: "/images/customerfirst.png",
    description: "Premier customer service solutions for businesses of all sizes."
  },
  {
    id: 6,
    name: "ProjectPro Management",
    imagePath: "/images/projectpro.png",
    description: "Project management consultancy with expertise in delivering complex projects."
  }
];

// Get all companies - protected route
router.get('/', authenticateToken, (req, res) => {
  res.json(companies);
});

module.exports = router;
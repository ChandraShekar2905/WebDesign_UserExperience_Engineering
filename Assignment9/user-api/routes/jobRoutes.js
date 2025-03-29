const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Sample job data - in a production app, this would come from MongoDB
const jobPosts = [

];

// Get all jobs - protected route
router.get('/', authenticateToken, (req, res) => {
  res.json(jobPosts);
});

module.exports = router;
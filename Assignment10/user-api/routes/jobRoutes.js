const express = require('express');
const router = express.Router();
const { createJob, getAllJobs } = require('../controllers/jobController');
const { authenticateToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/adminMiddleware');

// Get all jobs - accessible by all authenticated users
router.get('/', authenticateToken, getAllJobs);

// Create job - admin only
router.post('/', authenticateToken, isAdmin, createJob);

module.exports = router;
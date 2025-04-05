const Job = require('../models/jobModel');

// Create a new job (Admin only)
const createJob = async (req, res) => {
  try {
    const { companyName, title, description, salary, requiredSkills } = req.body;
    
    // Add createdBy field with the admin's user ID
    const job = await Job.create({
      companyName,
      title,
      description,
      salary,
      requiredSkills: requiredSkills || [],
      createdBy: req.user.id
    });
    
    res.status(201).json({
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort('-createdAt');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createJob, getAllJobs };
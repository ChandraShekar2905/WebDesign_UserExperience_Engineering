const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    // Create user
    const user = await User.create({
      fullName,
      email,
      password
    });
    
    if (user) {
      return res.status(201).json({ message: 'User created successfully.' });
    } else {
      return res.status(400).json({ error: 'Validation failed.' });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Validation failed.' });
  }
};

// Update user details
const updateUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    
    // Update user fields if provided
    if (fullName) {
      user.fullName = fullName;
    }
    
    if (password) {
      user.password = password; // Password will be hashed by pre-save hook
    }
    
    // Save updated user
    await user.save();
    
    return res.status(200).json({ message: 'User details updated successfully.' });
  } catch (error) {
    return res.status(400).json({ error: 'Validation failed.' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const email = req.params.email;
    
    // Find and delete user
    const user = await User.findOneAndDelete({ email });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    
    // If user had an image, delete it as well
    if (user.imagePath) {
      const imagePath = path.join(__dirname, '..', user.imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('fullName email');
    
    return res.status(200).json({ 
      users: users.map(user => ({
        fullName: user.fullName,
        email: user.email
      }))
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Upload user image
const uploadImage = async (req, res) => {
  try {
    // Email is expected in the body, and file in req.file
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    
    // Check if user already has an image
    if (user.imagePath) {
      return res.status(400).json({ error: 'Image already exists for this user.' });
    }
    
    // If no file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded or invalid file format.' });
    }
    
    // Update user with image path using findOneAndUpdate to bypass validation
    const filePath = `/images/${req.file.filename}`;
    await User.findOneAndUpdate(
      { email },
      { imagePath: filePath },
      { new: true, runValidators: false }
    );
    
    return res.status(201).json({ 
      message: 'Image uploaded successfully.',
      filePath: filePath
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  uploadImage
};
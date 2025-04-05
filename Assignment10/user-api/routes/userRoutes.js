const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/adminMiddleware');
const { validateUserCreate, validateUserUpdate } = require('../middleware/validation');
const upload = require('../middleware/fileUpload');
const {
  createUser,
  updateUser,
  deleteUser,
  uploadImage
} = require('../controllers/userController');

// Get all users route
router.get('/', authenticateToken, isAdmin, getAllUsers);

// Create user route
router.post('/', validateUserCreate, createUser);

// Update user route
router.put('/edit', validateUserUpdate, updateUser);

// Delete user route
router.delete('/:email', deleteUser);

// Upload image route
router.post('/uploadImage', upload.single('image'), uploadImage);



module.exports = router;
const express = require('express');
const router = express.Router();
const { validateUserCreate, validateUserUpdate } = require('../middleware/validation');
const upload = require('../middleware/fileUpload');
const {
  createUser,
  updateUser,
  deleteUser,
  uploadImage
} = require('../controllers/userController');

// Create user route
router.post('/', validateUserCreate, createUser);

// Update user route
router.put('/edit', validateUserUpdate, updateUser);

// Delete user route
router.delete('/:email', deleteUser);

// Upload image route
router.post('/uploadImage', upload.single('image'), uploadImage);

module.exports = router;
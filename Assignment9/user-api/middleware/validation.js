const validator = require('validator');

// Validate user creation input
const validateUserCreate = (req, res, next) => {
  const { fullName, email, password } = req.body;
  const errors = [];

  // Validate full name
  if (!fullName || !fullName.trim()) {
    errors.push('Full name is required');
  } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
    errors.push('Full name can only contain alphabetic characters');
  }

  // Validate email
  if (!email || !email.trim()) {
    errors.push('Email is required');
  } else if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email');
  }

  // Validate password
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
    errors.push('Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed.' });
  }

  next();
};

// Validate user update input
const validateUserUpdate = (req, res, next) => {
  const { fullName, password } = req.body;
  const errors = [];

  // Validate full name if provided
  if (fullName !== undefined) {
    if (!fullName.trim()) {
      errors.push('Full name cannot be empty');
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      errors.push('Full name can only contain alphabetic characters');
    }
  }

  // Validate password if provided
  if (password !== undefined) {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
      errors.push('Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed.' });
  }

  next();
};

module.exports = {
  validateUserCreate,
  validateUserUpdate
};
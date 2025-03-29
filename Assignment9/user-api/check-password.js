require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user-api')
  .then(async () => {
    try {
      const email = 'john.doe@example.com';
      const passwordToCheck = 'StrongPass1!';
      
      console.log(`Checking password for ${email}...`);
      
      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found!');
        process.exit(1);
      }
      
      console.log('User found:', user.fullName);
      console.log('Stored hashed password:', user.password);
      
      // Check the password manually
      const isMatch = await bcrypt.compare(passwordToCheck, user.password);
      console.log(`Password '${passwordToCheck}' matches: ${isMatch}`);
      
      // If it doesn't match, try some variations
      if (!isMatch) {
        const alternativePasswords = ['password', 'Password1!', 'StrongPass123!'];
        for (const altPassword of alternativePasswords) {
          const altMatch = await bcrypt.compare(altPassword, user.password);
          console.log(`Alternative password '${altPassword}' matches: ${altMatch}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
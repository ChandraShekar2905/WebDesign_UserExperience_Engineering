require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user-api')
  .then(async () => {
    try {
      const email = 'john.doe@example.com';
      const newPassword = 'StrongPass1!';
      
      console.log(`Updating password for ${email}...`);
      
      // Find the user
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found!');
        process.exit(1);
      }
      
      // Generate salt and hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update the user's password directly in the database to bypass validation
      await User.updateOne(
        { email: email },
        { $set: { password: hashedPassword } }
      );
      
      console.log(`Password updated successfully for ${email}`);
      console.log('New hashed password:', hashedPassword);
      
      // Verify the update
      const updatedUser = await User.findOne({ email });
      const isMatch = await bcrypt.compare(newPassword, updatedUser.password);
      console.log(`Verification: Password '${newPassword}' matches: ${isMatch}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
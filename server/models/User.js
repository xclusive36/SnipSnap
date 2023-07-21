// Import required modules from Mongoose and bcrypt
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema using Mongoose Schema
const userSchema = new Schema({
  // User's username field
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // User's email field
  email: {
    type: String,
    required: true,
    unique: true,
    // Validate email format using a regular expression
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  // User's password field
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  // User's appointments field referencing the 'Appointment' model using ObjectId
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
    },
  ],
});

// Pre-save middleware to hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
  // Check if the user is new or if the password is modified
  if (this.isNew || this.isModified('password')) {
    // Generate a salt and hash the user's password
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // Call the next middleware in the save process
  next();
});

// Method to compare user's input password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  // Use bcrypt's compare method to check if the input password matches the hashed password
  return bcrypt.compare(password, this.password);
};

// Create the User model using the user schema
const User = model('User', userSchema);

// Export the User model
module.exports = User;

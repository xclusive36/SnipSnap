// Import the required dependencies: mongoose and Schema from mongoose.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new mongoose schema for the Stylist model.
const stylistSchema = new mongoose.Schema({
  // Define the stylistName field as a string type with the following properties:
  stylistName: {
    type: String,       
    required: true,     
    trim: true,         
    unique: true, 
  },      
});

// Create a mongoose model named 'Stylist' using the defined schema.

const Stylist = mongoose.model('Stylist', stylistSchema);

// Export the 'Stylist' model to make it available for usage in other parts of the application.
module.exports = Stylist;

// Import the required modules for defining the Mongoose schema.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new Mongoose schema for the "Service" model.
const serviceSchema = new mongoose.Schema({
  // Define the "serviceName" field of type String.
  serviceName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  // Define the "serviceDescription" field of type String.
  serviceDescription: {
    type: String,
    required: false,
    trim: true,
  },
  // Define the "servicePrice" field of type String.
  servicePrice: {
    type: String,
    required: true,
    trim: true
  },
  // Define the "customerNotes" field of type String.
  customerNotes: {
    type: String,
    required: false,
    trim: true
  }
});

// Create a Mongoose model named "Service" based on the defined schema.
const Service = mongoose.model('Service', serviceSchema);

// Export the "Service" model to make it available for usage in other parts of the app.
module.exports = Service;

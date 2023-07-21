// Import required modules and initialize Mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the appointment schema using Mongoose Schema
const appointmentSchema = new mongoose.Schema({
  // Customer's name for the appointment, required field
  customerName: { type: String, required: true },
  // Name of the stylist or beautician, required field
  stylistName: { type: String, required: true },
  // Date of the appointment, required field
  appointmentDate: { type: String, required: true },
  // Time of the appointment, required field
  appointmentTime: { type: String, required: true },
  // Type of appointment (e.g., haircut, manicure), required field
  appointmentType: { type: String, required: true },
  // Cost of the appointment, required field
  appointmentCost: { type: String, required: true },
});

// Create the "Appointment" model using the appointment schema
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Export the Appointment model to make it available for usage in other parts of the app
module.exports = Appointment;

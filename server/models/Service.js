const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  serviceDescription: {
    type: String,
    required: false,
    trim: true,
  },
  servicePrice: {
    type: String,
    required: true,
    trim: true
  },
  customerNotes: {
    type: String,
    required: false,
    trim: true
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

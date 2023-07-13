const { Schema, model } = require('mongoose');


const serviceSchema = new Schema ({
  serviceName: {
    type: String,
    required: true
  }, 
  servicePrice: {
    type: Number,
    required: true
  },
  serviceDescription: {
    type: String,
    required: true
  },
  customerNotes: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 250
  }
});


const Service = model('Services', serviceSchema);

module.exports = Service;
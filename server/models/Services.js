const { Schema, model } = require('mongoose');



const serviceSchema = new Schema ({
  name: {
    type: String,
    required: true
  }, 
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 250
  }
});


const Service = model('Services', serviceSchema);

module.exports = Service;
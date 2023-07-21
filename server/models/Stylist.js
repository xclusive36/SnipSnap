const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stylistSchema = new mongoose.Schema({
  stylistName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Stylist = mongoose.model('Stylist', stylistSchema);

module.exports = Stylist;
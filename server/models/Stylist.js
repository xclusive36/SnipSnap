const { Schema, model } = require('mongoose');

const stylistSchema = new Schema({
  stylistName: {
    type: String,
    required: true,
    trim: true,
  },
});
const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A produce must have a name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A produce must have a description'],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A produce must have an image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A farm must have a name'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'A farm must have a location'],
  },
  description: {
    type: String,
    required: [true, 'A farm must have a description'],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A farm must have an image'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;

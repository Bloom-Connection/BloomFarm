const mongoose = require('mongoose');
const slugify = require('slugify');

const farmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A farm must have a name'],
      trim: true,
    },
    slug: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// })

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;

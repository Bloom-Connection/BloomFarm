const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const farmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A farm must have a name'],
      trim: true,
      maxlength: [40, 'A farm name cannot be more than 40 characters'],
      minlength: [10, 'A farm name must have more than 10 characters'],
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
farmSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// farmSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// })

farmSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// QUERY MIDDLEWARE
farmSchema.pre(/^find/, function (next) {
  this.find({ secretFarm: { $ne: true } });

  this.start = Date.now();
  next();
});

farmSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
farmSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretFarm: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;

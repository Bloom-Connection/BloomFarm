const Farm = require('../models/farmModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopFarms = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  next();
};

exports.getAllFarms = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Farm.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const farms = await features.query;

    res.status(200).json({
      status: 'success',
      results: farms.length,
      data: {
        farms,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        farm,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createFarm = async (req, res) => {
  try {
    const newFarm = await Farm.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        farms: newFarm,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        farm,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteFarm = async (req, res) => {
  try {
    await Farm.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getFarmStats = async (req, res) => {
  try {
    const stats = await Farm.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$state' },
          numRating: { $sum: 1 },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      {
        $match: { avgPrice: { $gt: 500 } },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

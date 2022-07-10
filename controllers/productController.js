const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    // 1A) Build the query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Product.find(JSON.parse(queryStr));
    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
    } else {
      query.sort('-createdAt');
    }

    // 3) Fields Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query.select(fields);
    } else {
      query.select('-__v');
    }

    if (req.query.page) {
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      query.skip(startIndex).limit(limit);
    }
    const Products = await query;

    res.status(200).json({
      status: 'success',
      results: Products.length,
      data: {
        Products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const Product = await Product.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        Product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        Products: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const Product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        Product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
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

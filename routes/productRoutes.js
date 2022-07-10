const express = require('express');
const productController = require('./../controllers/productController');
const router = express.Router();

// router.param('id', productController.checkID);

router
  .route('/')
  .get(productController.getAllProducts) // GET all productss
  .post(productController.createProduct); // Creating a new product route

router
  .route('/:id')
  .get(productController.getProduct) // Getting a product by ID
  .patch(productController.updateProduct) // Updating a product route
  .delete(productController.deleteProduct); // Deleting a product route

module.exports = router;

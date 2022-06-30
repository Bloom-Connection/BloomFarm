const express = require('express');
const farmController = require('./../controllers/farmController');
const router = express.Router();

// router.param('id', farmController.checkID);

router
  .route('/')
  .get(farmController.getAllFarms) // GET all farms
  .post(farmController.createFarm); // Creating a new farm route

router
  .route('/:id')
  .get(farmController.getFarm) // Getting a farm by ID
  .patch(farmController.updateFarm) // Updating a farm route
  .delete(farmController.deleteFarm); // Deleting a farm route

module.exports = router;

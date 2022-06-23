const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const farms = JSON.parse(
  fs.readFileSync(`${__dirname}/data/farms.json`, 'utf-8')
);

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); // for parsing application/json

// 2) ROUTE HANDLERS
const getAllFarms = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: farms.length,
    data: {
      farms,
    },
  });
};

const getFarm = (req, res) => {
  const id = parseInt(req.params.id);
  if (id > farms.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  } else {
    const farm = farms.find((el) => el.id === id);
    res.status(200).json({
      status: 'success',
      data: {
        farm,
      },
    });
  }
};

const createFarm = (req, res) => {
  const newId = farms[farms.length - 1].id + 1;
  const newFarm = {
    id: newId,
    ...req.body,
  };
  farms.push(newFarm);
  fs.writeFile(`${__dirname}/data/farms.json`, JSON.stringify(farms), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        farms: newFarm,
      },
    });
  });
};

const updateFarm = (req, res) => {
  const id = parseInt(req.params.id);
  const farm = farms.find((el) => el.id === id);
  if (!farm) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  const updatedFarm = Object.assign(farm, req.body);
  res.status(200).json({
    status: 'success',
    data: {
      farm: updatedFarm,
    },
  });
};

const deleteFarm = (req, res) => {
  const id = parseInt(req.params.id);
  const farm = farms.find((el) => el.id === id);
  if (!farm) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  const updatedFarm = farms.filter((el) => el.id !== id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.get('/', (req, res) => {
  res.send('Hello from the Bloomfarm Server!');
});

// 3) ROUTES
app
  .route('/api/v1/farms/')
  .get(getAllFarms) // GET all farms
  .post(createFarm); // Creating a new farm route

app
  .route('/api/v1/farms/:id')
  .get(getFarm) // Getting a farm by ID
  .patch(updateFarm) // Updating a farm route
  .delete(deleteFarm); // Deleting a farm route

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4)  START SERVER
const port = 8000;
app.listen(port, () => console.log(`App running on port ${port}...`));

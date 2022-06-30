const express = require('express');
const morgan = require('morgan');
const farmRouter = require('./routes/farmRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); // for parsing application/json
app.use(express.static(`${__dirname}/src`));

app.get('/', (req, res) => {
  res.send('Hello from the Bloomfarm Server!');
});

// 3) ROUTES REGISTRATION
app.use('/api/v1/farms', farmRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

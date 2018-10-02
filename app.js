const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const rootRouter = require('./routes/root');
const usersRouter = require('./routes/users');

mongoose.connect(
  'mongodb://localhost/trellone',
  { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/', rootRouter);
app.use('/users', usersRouter);

module.exports = app;

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('volleyball');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const boardsRouter = require('./routes/boards');
const listsRouter = require('./routes/lists');

mongoose
  .connect('mongodb://localhost/trellone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    () => console.log('Connected to Local Mongo'),
    err => {
      console.error('Cannot connect to Mongo:', err);
      process.exit(-1);
    }
  );

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/lists', listsRouter);

module.exports = app;

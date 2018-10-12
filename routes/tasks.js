const router = require('express').Router();

const { requireAuth } = require('../services/passport');
const List = require('../models/Task');

// GET all lists for a board.
router.get('/list/:id', requireAuth, async (req, res) => {
  const tasks = await List.find({ listId: req.params.id }, null, {
    sort: 'order'
  });

  console.log({ tasks });

  res.send(tasks);
});

// Get a particular task (am I going to need this?)
router.get('/:id', requireAuth, async (req, res) => {
  const tasks = await Tasks.findById(req.params.id);

  console.log({ tasks });

  res.send(tasks);
});

// Create a new task
router.post('/create', requireAuth, async (req, res) => {
  const { text, order, listId } = req.body;

  if (!req.body.text) {
    return res.status(422).send({
      error: 'You must provide a task'
    });
  }

  const newTask = new Task({
    text,
    order,
    listId,
    archived: false
  });

  const task = await newTask.save();

  res.send(task);
});

// Archive a task
router.post('/:id/archive', requireAuth, async (req, res) => {
  const response = await Tasks.updateOne({_id: req.params.id}, {$set: {archived: true}});

  res.send(response);
});

module.exports = router;

const router = require('express').Router();

const { requireAuth } = require('../services/passport');
const List = require('../models/List');

// GET all lists and their tasks for a board.
router.get('/board/:id', requireAuth, async (req, res) => {
  const lists = await List.find(
    { boardId: req.params.id, archived: false },
    null,
    { sort: 'order' }
  );

  res.send(lists);
});

// Create a new list
router.post('/create', requireAuth, async (req, res) => {
  const { name, order, boardId } = req.body;

  if (!name || isNaN(order) || !boardId) {
    return res.status(422).send({
      error: 'You must provide a name, order, and board ID',
    });
  }

  const newList = new List({
    name,
    order,
    boardId,
    archived: false,
  });

  const list = await newList.save();

  res.status(201).send(list);
});

router.post('/createTask/:id', requireAuth, async (req, res) => {
  const { text, order } = req.body;

  if (!text || isNaN(order)) {
    return res.status(422).send({
      error: 'You must provide a task text and an order',
    });
  }

  const newTask = {
    text,
    order,
    archived: false,
  };

  const response = await List.updateOne(
    { _id: req.params.id },
    { $push: { tasks: newTask } }
  );

  res.status(201).send(response);
});

// Update a list
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUcmVsbG9uZSIsInN1YiI6IjVkOWI1NGExYjVjNmRhMDE4MTJmYmVkMCIsImlhdCI6MTU3MTc2OTAxMywiZXhwIjoxNTcxODU5MDEzfQ.QxJuvk6tNaUHd2jNQ1qlZ4gjRYFryYiQB4YV-SClUAg"
router.put('/update/:id', requireAuth, async (req, res) => {
  const { name, order, archived, tasks } = req.body;

  const response = await List.updateOne(
    { _id: req.params.id },
    { $set: { name, order, archived, tasks } }
  );

  if (response.nModified === 1) return res.status(202).send(response);

  return res.status(400).send(response);
});

// Archive a list
router.post('/:id/archive', requireAuth, async (req, res) => {
  const response = await List.updateOne(
    { _id: req.params.id },
    { $set: { archived: true } }
  );

  // console.log({ response });

  res.status(202).send(response);
});

// Get a particular list (am I going to need this?)
router.get('/:id', requireAuth, async (req, res) => {
  const list = await List.findById(req.params.id);

  console.log({ list });

  res.send(list);
});

module.exports = router;

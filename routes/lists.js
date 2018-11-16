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

// Get a particular list (am I going to need this?)
router.get('/:id', requireAuth, async (req, res) => {
  const list = await List.findById(req.params.id);

  // console.log({ list });

  res.send(list);
});

// Create a new list
router.post('/create', requireAuth, async (req, res) => {
  const { name, order, boardId } = req.body;

  if (!name || isNaN(order) || !boardId) {
    return res.status(422).send({
      error: 'You must provide a name, order, and board ID'
    });
  }

  const newList = new List({
    name,
    order,
    boardId,
    archived: false
  });

  const list = await newList.save();

  res.status(201).send(list);
});

router.post('/createTask/:id', requireAuth, async (req, res) => {
  const { text, order } = req.body;

  if (!text || isNaN(order)) {
    return res.status(422).send({
      error: 'You must provide a task text and an order'
    });
  }

  const newTask = {
    text,
    order,
    archived: false
  };

  const response = await List.updateOne(
    { _id: req.params.id },
    { $push: { tasks: newTask } }
  );

  res.status(201).send(response);
});

// Archive a list
router.post('/:id/archive', requireAuth, async (req, res) => {
  const response = await List.updateOne(
    { _id: req.params.id },
    { $set: { archived: true } }
  );

  // console.log({ response });

  res.send(response);
});

module.exports = router;

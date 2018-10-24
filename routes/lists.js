const router = require('express').Router();

const { requireAuth } = require('../services/passport');
const List = require('../models/List');
const Task = require('../models/Task');

// GET all lists and their tasks for a board.
router.get('/board/:id', requireAuth, async (req, res) => {
  const lists = await List.find(
    { boardId: req.params.id, archived: false },
    null,
    { sort: 'order' }
  );

  const tasks = await Task.find({
    listId: { $in: lists.map(list => list._id) },
    archived: false
  });

  const withTasks = lists.map(list => ({
    _id: list._id,
    name: list.name,
    order: list.order,
    boardId: list.boardId,
    archived: list.archived,
    tasks: tasks.filter(({ listId }) => listId.equals(list._id))
  }));

  res.send(withTasks);
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

  if (!req.body.name) {
    return res.status(422).send({
      error: 'You must provide a name'
    });
  }

  const newList = new List({
    name,
    order,
    boardId,
    archived: false
  });

  const list = await newList.save();

  res.send(list);
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

const router = require('express').Router();

const { requireAuth } = require('../services/passport');
const List = require('../models/List');

// GET all lists for a board.
router.get('/board/:id', requireAuth, async (req, res) => {
  const lists = await List.find({ boardId: req.params.id }, null, {
    sort: 'order'
  });

  //  console.log({lists});

  res.send(lists);
});

// Get a particular list (am I going to need this?)
router.get('/:id', requireAuth, async (req, res) => {
  const list = await List.findById(req.params.id);

  console.log({ list });

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

module.exports = router;

const router = require('express').Router();

const { requireAuth } = require('../services/passport');
const Board = require('../models/Board');

// GET boards listing.
router.get('/', requireAuth, async (req, res) => {
  const boards = await Board.find({ ownerId: req.user.id });

  res.send(boards);
});

// Return a board
router.get('/:id', requireAuth, async (req, res) => {
  const board = await Board.findById(req.params.id);

  res.send(board);
});

// Create a new board
router.post('/create', requireAuth, async (req, res) => {
  const { name, backgroundURL } = req.body;

  if (!req.body.name) {
    return res.status(422).send({
      error: 'You must provide a name',
    });
  }

  const newBoard = new Board({
    name,
    backgroundURL,
    ownerId: req.user.id,
  });

  const board = await newBoard.save();

  res.status(201).send(board);
});

// Delete a board
router.delete('/:id', async (req, res) => {
  const response = await Board.deleteOne({ _id: req.params.id });

  if (response.deletedCount === 1) res.json({ ok: true });
  else res.json({ error: true, response });
});

module.exports = router;

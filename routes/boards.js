const router = require('express').Router();
const passport = require('passport');

require('../services/passport');

const Board = require('../models/Board');

const requireAuth = passport.authenticate('jwt', { session: false });

/* GET users listing. */
router.get('/', requireAuth, async (req, res) => {
  const boards = await Board.find({ ownerId: req.user.id });

  res.send(boards);
});

router.get('/:id', requireAuth, async (req, res) => {
  const board = await Board.findById(req.params.id);

  res.send(board);
});

router.post('/create', requireAuth, async (req, res) => {
  const { name, backgroundURL } = req.body;

  if (!req.body.name) {
    return res.status(422).send({
      error: 'You must provide a name'
    });
  }

  const newBoard = new Board({
    name,
    backgroundURL,
    ownerId: req.user.id
  });

  const board = await newBoard.save();

  res.send(board);
});

module.exports = router;

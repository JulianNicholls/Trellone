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

router.post('/create', requireAuth, async (req, res) => {
  const { name, backgroundURL } = req.body;

  const newBoard = new Board({
    name,
    backgroundURL,
    ownerId: req.user.id
  });

  const board = await newBoard.save();

  res.send(board);
});

module.exports = router;

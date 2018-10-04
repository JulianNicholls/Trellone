const router = require('express').Router();
const passport = require('passport');

require('../services/passport');

const List = require('../models/List');

const requireAuth = passport.authenticate('jwt', { session: false });

/* GET board listing. */
router.get('/board/:id', requireAuth, async (req, res) => {
  const lists = await List.find({ boardId: req.params.id });

  console.log(lists);

  res.send(lists);
});

router.get('/:id', requireAuth, async (req, res) => {
  const list = await List.findById(req.params.id);

  console.log({ list });

  res.send(list);
});

router.post('/create', requireAuth, async (req, res) => {
  const { name, order, boardId } = req.body;

  const newList = new Board({
    name,
    order,
    boardId
  });

  const board = await newList.save();

  res.send(board);
});

module.exports = router;

const router = require('express').Router();

const { requireAuth } = require('../services/passport');

// GET current user info
router.get('/current', requireAuth, (req, res) => {
  const { displayName, email, avatarURL } = req.user;
  res.json({ displayName, email, avatarURL });
});

module.exports = router;

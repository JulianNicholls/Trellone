const router = require('express').Router();
const passport = require('passport');

require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });

/* GET users listing. */
router.get('/current', requireAuth, (req, res) => {
  const { displayName, email, avatarURL } = req.user;
  res.json({ displayName, email, avatarURL });
});

module.exports = router;

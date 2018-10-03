const router = require('express').Router();

const Authentication = require('../controllers/authentication');
const passport = require('passport');

require('../services/passport');

const requireLogin = passport.authenticate('local', { session: false });

router.post('/signup', Authentication.signup);
router.post('/login', requireLogin, Authentication.login);

module.exports = router;

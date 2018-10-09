const router = require('express').Router();

const Authentication = require('../controllers/authentication');

const { requireLogin } = require('../services/passport');

router.post('/signup', Authentication.signup);
router.post('/login', requireLogin, Authentication.login);

module.exports = router;

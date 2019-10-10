const jwt = require('jwt-simple');

const User = require('../models/User');
const config = require('../config');

const HOURS25 = 25 * 3600; // 25 hours of seconds

// Return a JWT for the given user
exports.tokenForUser = user => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  return jwt.encode(
    { iss: 'Trellone', sub: user.id, iat: timestamp, exp: timestamp + HOURS25 },
    config.authSecret
  );
};

// Sign a user up
exports.signup = (req, res, next) => {
  // Load data from the POST
  const { email, password, displayName, avatarURL } = req.body;

  // An email address, display name, and password are mandatory
  if (
    !email ||
    !password ||
    password.length < 6 ||
    !displayName ||
    displayName.length < 6
  ) {
    return res.status(422).send({
      error:
        'You must provide a display name, an email address, and a password of at least 6 characters',
    });
  }

  // See if a user exists with the given email address
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) return next(err);

    // If so, return an error
    if (existingUser) {
      return res
        .status(422)
        .send({ error: 'That email address has already been registered' });
    }

    // Otherwise, create a new user
    const user = new User({ email, password, displayName, avatarURL });

    user.save((err, user) => {
      if (err) return next(err);

      const { email, avatarURL, displayName } = user;

      // Respond to request with a JWT
      res.status(201).json({
        token: exports.tokenForUser(user),
        user: {
          email,
          avatarURL,
          displayName,
        },
      });
    });
  });
};

// Log a user in:
// Their email and password have been authenticated, we need to return a token
exports.login = (req, res) => {
  // Passport has put the user specified in the done() callback
  // into the req

  const { email, avatarURL, displayName } = req.user;

  res.json({
    token: exports.tokenForUser(req.user),
    user: {
      email,
      avatarURL,
      displayName,
    },
  });
};

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });
exports.authenticator = (req, res, next) => {
  //! validation from database
};

exports.createSendToken = (user, statusCode, req, res) => {
  console.log(user);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + 60 * 60 * 1000);
  res.cookie('jwt', token, {
    expires: expiryDate,
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    message: 'successful',
    token,
    data: {
      user,
    },
  });
};
exports.isAuth = (req, res, next) => {
  try {
    const user = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    req.user = user;
    if (user) {
      return next();
    }
    res.redirect('/login');
  } catch (err) {
    res.redirect('/login');
  }
};

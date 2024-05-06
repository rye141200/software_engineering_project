const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });
const authenticationHandler = require('./authenticationHandler');
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw err;
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.correctPassword(password, user.password)) {
      throw err;
    }
    authenticationHandler.createSendToken(user, 200, req, res);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 'failure',
      message: 'the entered credentials were invalid ❎',
    });
  }
};
exports.renderLoginUI = (req, res) => {
  // if (req.cookies && Object.keys(req.cookies).length > 0) {
  //   res.status(200).redirect('/home');
  // } else {
  //   res.status(200).render(`${__dirname}/../public/login`);
  // }
  try {
    const user = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    if (user) res.redirect('/home');
  } catch (err) {
    res.status(200).render(`${__dirname}/../public/login`);
  }
};

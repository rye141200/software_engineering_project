const express = require('express');
const bookingsHandler = require(
  `${__dirname}/../Controllers/myBookingsHandler`,
);
const authHandler = require('./../Controllers/authenticationHandler');
//?Import controller here

const router = express.Router();

router.route('/').get(authHandler.isAuth, bookingsHandler.renderMyBookingsUI);
module.exports = router;

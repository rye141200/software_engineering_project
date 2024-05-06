const express = require('express');
const myTourHandler = require(
  `${__dirname}/../Controllers/companyToursHandler`,
);
const authHandler = require('./../Controllers/authenticationHandler');
//?Import controller here

const router = express.Router();

router.route('/').get(authHandler.isAuth, myTourHandler.renderMyToursUI);
module.exports = router;

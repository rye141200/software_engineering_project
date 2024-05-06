const express = require('express');
const bookingHandler = require(`${__dirname}/../Controllers/bookingHandler`);
const authHandler = require('./../Controllers/authenticationHandler');
//?Import controller here

const router = express.Router();

router.route('/:name').get(authHandler.isAuth, bookingHandler.bookTour);
module.exports = router;

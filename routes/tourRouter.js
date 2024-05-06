const express = require('express');
const tourHandler = require(`${__dirname}/../Controllers/tourHandler`);
const authHandler = require('./../Controllers/authenticationHandler');
//?Import controller here

const router = express.Router();

router
  .route('/:name')
  .get(authHandler.isAuth, tourHandler.getTour)
  .delete(authHandler.isAuth, tourHandler.deleteTour);

module.exports = router;

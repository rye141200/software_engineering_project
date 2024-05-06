const express = require('express');
const newTourHandler = require(`${__dirname}/../Controllers/newTourHandler`);
const authHandler = require('./../Controllers/authenticationHandler');
require('dotenv').config({ path: './config.env' });

//?Import controller here

const router = express.Router();

router
  .route('/')
  .get(
    authHandler.isAuth,
    newTourHandler.companyAuth,
    newTourHandler.renderNewTourUI,
  )
  .post(
    authHandler.isAuth,
    newTourHandler.uploadTourPhoto,
    newTourHandler.resizeTourImages,
    newTourHandler.newTourUpload,
  );
module.exports = router;

const express = require('express');
const signupHandler = require(`${__dirname}/../Controllers/signupHandler`);

//?Import controller here

const router = express.Router();

router
  .route('/user')
  .post(signupHandler.signupUser)
  .get(signupHandler.renderSignupUserUI);
router
  .route('/company')
  .post(signupHandler.signupCompany)
  .get(signupHandler.renderSignupCompanyUI);

module.exports = router;

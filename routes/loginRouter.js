const express = require('express');
const loginHandler = require(`${__dirname}/../Controllers/loginHandler`);
const authHandler = require('./../Controllers/authenticationHandler');
//?Import controller here

const router = express.Router();

router.route('/').post(loginHandler.login).get(loginHandler.renderLoginUI);
module.exports = router;

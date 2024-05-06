const express = require('express');
const homeHandler = require(`${__dirname}/../Controllers/homeHandler`);
const authHandler = require('./../Controllers/authenticationHandler');
//?Import controller here

const router = express.Router();

router.route('/').get(authHandler.isAuth, homeHandler.renderHomeUI);
module.exports = router;

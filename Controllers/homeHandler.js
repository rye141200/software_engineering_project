const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Tour = require('./../models/tourModel');
require('dotenv').config({ path: './config.env' });
exports.renderHomeUI = async (req, res) => {
  try {
    const user = JSON.parse(
      JSON.stringify(
        await User.findOne({
          _id: jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id,
        }),
      ),
    );
    const tours = JSON.parse(JSON.stringify(await Tour.find()));
    res.status(200).render('UserHomePage', { user, tours });
  } catch (err) {
    return res.status(404).json({
      status: 'failure',
      message: "Couldn't render home page",
    });
  }
};

const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Tour = require('./../models/tourModel');
require('dotenv').config({ path: './config.env' });

exports.renderMyToursUI = async (req, res) => {
  try {
    const user = JSON.parse(
      JSON.stringify(
        await User.findOne({
          _id: jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id,
        }),
      ),
    );
    // User.findOne({_id: jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id}).populate('tours');

    const tours = await Promise.all(
      user.tours.map(async (tour) => {
        const a = JSON.parse(JSON.stringify(await Tour.findOne({ _id: tour })));
        return a;
      }),
    );
    console.log('this is tours of ', tours);
    res.status(200).render('myTours', { user, tours });
  } catch (err) {
    return res.status(404).json({
      status: 'failure',
      message: "Couldn't render tours",
    });
  }
};

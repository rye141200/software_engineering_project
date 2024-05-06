const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'config.env' });
exports.getTour = async (req, res) => {
  try {
    const tour = JSON.parse(
      JSON.stringify(
        await Tour.findOne({
          name: req.params.name.split('-').join(' '),
        }),
      ),
    );
    const user = JSON.parse(
      JSON.stringify(
        await User.findOne({
          _id: jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id,
        }),
      ),
    );

    res.status(200).render('tourDetails', { tour, user });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      status: 'failure',
      message: "Couldn't get tour",
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: 'failure',
      message: "Couldn't create tours",
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = JSON.parse(
      JSON.stringify(
        await Tour.findOne({
          name: req.params.name.split('-').join(' '),
        }),
      ),
    );
    const user = JSON.parse(
      JSON.stringify(
        await User.findOne({
          _id: jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id,
        }),
      ),
    );
    console.log('this is the role ', user.role);

    if (user.role === 'company') {
      //! delete tour from tour collection
      await Tour.deleteOne({ _id: tour._id });
      //! delete tour from all users collection
      await User.updateMany(
        { tours: tour._id },
        { $pull: { tours: tour._id } },
      );
    } else if (user.role === 'user') {
      await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { tours: tour._id } },
        { new: true },
      );
    }
    res.status(200).json({
      status: 'success',
      message: 'success',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: "couldn't delete the tour",
    });
  }
};

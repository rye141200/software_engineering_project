const multer = require('multer');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Tour = require('./../models/tourModel');
require('dotenv').config({ path: './config.env' });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('not an image file! please upload only images.', 400, false),
    );
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadTourPhoto = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

//! resizing tour photo
exports.resizeTourImages = async (req, res, next) => {
  //! resize image cover
  const imageCoverFilename = `tour-${req.user.id}-${Date.now()}-cover.jpg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${__dirname}/../public/img/tours/${imageCoverFilename}`);
  // TODO: how to put this info in the tour model DB???
  req.body.imageCover = imageCoverFilename;
  //! resize tour images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `tour-${req.user.id}-${Date.now()}-${i + 1}.jpg`;
      await sharp(file.buffer)
        .resize(400, 266)
        .toFormat('jpeg')
        .jpeg({ quality: 100 })
        .toFile(`${__dirname}/../public/img/tours/${filename}`);
      req.body.images.push(filename);
    }),
  );
  // TODO: how to put this info in the tour model DB???

  next();
};
exports.renderNewTourUI = async (req, res) => {
  req.user = JSON.parse(
    JSON.stringify(
      await User.findOne({
        _id: jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id,
      }),
    ),
  );
  res.status(200).render('newTour', { user: req.user });
};

exports.companyAuth = async (req, res, next) => {
  const user = JSON.parse(
    JSON.stringify(
      await User.findOne({
        _id: jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id,
      }),
    ),
  );
  if (user.role === 'company') {
    next();
  } else {
    res.status(401).json({
      status: '401 Unauthorized',
      message: "YOU DON'T HAVE THE PRIVILEGES TO ENTER HERE ❌",
    });
  }
};

exports.newTourUpload = async (req, res) => {
  try {
    const tour = req.body;
    tour.startDates = [tour.startDates];
    tour.duration = +tour.duration;
    tour.maxGroupSize = +tour.maxGroupSize;
    tour.price = +tour.price;
    tour.locations = JSON.parse(tour.locations);
    tour.locations.forEach((el) => {
      el.day = +el.day;
      el.coordinates.forEach((e) => {
        e = +e;
      });
    });
    // console.log(tour, tour.locations[0].coordinates);
    await Tour.create(tour);

    const temp = JSON.parse(
      JSON.stringify(
        await Tour.findOne({
          name: tour.name,
        }),
      ),
    );

    tourID = temp.id;
    await User.findByIdAndUpdate(
      jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id,
      { $push: { tours: tourID } },
      {
        new: true,
      },
    );

    res.status(200).json({
      status: 'sucess',
      message: 'ok',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'failure',
      message: `Couldn't add a new tour`,
    });
  }
};

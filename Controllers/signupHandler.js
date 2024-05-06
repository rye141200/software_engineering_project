const User = require('./../models/userModel');
exports.signupUser = async (req, res) => {
  //   console.log(req.body);
  try {
    const newUser = await User.create({
      name: req.body.username,
      email: req.body.email,
      city: req.body.city,
      role: 'user',
      password: req.body.password,
      passwordConfirm: req.body.confirmPassword,
    });
    res.status(201).json({
      status: 'success',
      message: 'successful',
    });
  } catch (e) {
    res.status(400).json({
      status: 'failure',
      message: 'the entered credentials were invalid ❎',
    });
  }
};
exports.signupCompany = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create({
      name: req.body.companyName,
      email: req.body.email,
      location: req.body.location,
      role: 'company',
      password: req.body.password,
      passwordConfirm: req.body.confirmPassword,
      phoneNumber: req.body.phoneNumber,
    });
    res.status(201).json({
      status: 'success',
      message: 'successful',
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 'failure',
      message: 'the entered credentials were invalid ❎',
    });
  }
};
exports.renderSignupUserUI = (req, res) => {
  res.render(`${__dirname}/../public/signupUser`);
};
exports.renderSignupCompanyUI = (req, res) => {
  res.render(`${__dirname}/../public/signupCompany`);
};

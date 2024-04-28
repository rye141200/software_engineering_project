const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// when the user post data on sign_up page
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing form data

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  console.log(req.body);
});
app.get('/start_sign_up_user', (req, res) => {
  res.redirect('/sign_up_user');
});
app.get('/start_sign_up_company', (req, res) => {
  res.redirect('/sign_up_company');
});
app.get('/sign_up_user', (req, res) => {
  res.sendFile(__dirname + '/public/sign_up.html');
});
app.get('/sign_up_company', (req, res) => {
  res.sendFile(__dirname + '/public/sign_up_company.html');
});

app.post('/sign_up_user', (req, res) => {
  // Destructure request body
  const name = req.body.username;
  const email = req.body.email;
  const city = req.body.city;
  const password = req.body.password;
  const missingFields = [];

  // Check for each required field and add to the array if missing
  if (!name) missingFields.push('name');
  if (!password) missingFields.push('password');
  if (!email) missingFields.push('email');
  if (!city) missingFields.push('city');

  // If there are any missing fields, respond with a 400 status and specify which fields are missing
  if (missingFields.length > 0) {
    return res.status(400).json({
      message: 'failed',
      error: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }

  // Create a data object
  const data = { name, password, email, city };
  data.role = 'user';
  res.status(200).json({
    message: 'success',
    data: data,
  });
  // .redirect('/sign_up_test');
});

app.post('/sign_up_company', (req, res) => {
  // Destructure request body
  const name = req.body.companyname;
  const email = req.body.email;
  const location = req.body.location;
  const phone = req.body.phone;
  const password = req.body.password;
  const missingFields = [];

  // Check for each required field and add to the array if missing
  if (!name) missingFields.push('name');
  if (!password) missingFields.push('password');
  if (!email) missingFields.push('email');
  if (!phone) missingFields.push('phone');

  // If there are any missing fields, respond with a 400 status and specify which fields are missing
  if (missingFields.length > 0) {
    return res.status(400).json({
      status: 'failed',
      error: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }

  // Create a data object
  const data = { name, password, email, location, phone };
  data.role = 'company';
  // console.log(data);

  res.status(200).json({
    message: 'success',
    data: data,
  });
  // .redirect('/sign_up_test');
});

app.get('/sign_up_test', (req, res) => {
  // Make sure you use the absolute path to the file
  res.sendFile(__dirname + '/public/sign_up_test.html');
});

module.exports = app;

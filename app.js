const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const authHandler = require('./Controllers/authenticationHandler');
const bookingHandler = require('./Controllers/bookingHandler');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config.env' });
//!Middlewares
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/public/`);
app.use(express.static(`${__dirname}/public/`));
// when the user post data on sign_up page
app.use(
  express.urlencoded({
    limit: '500mb',
    parameterLimit: 10,
    extended: true,
  }),
);
app.post(
  '/webhook-checkout',
  bodyParser.raw({ type: 'application/json' }),
  bookingHandler.webhookCheckout,
);

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//! Routes
const loginRouter = require('./Routes/loginRouter');
const signupRouter = require('./Routes/signupRouter');
const homeRouter = require('./Routes/homeRouter');
const tourRouter = require('./Routes/tourRouter');
const newTourRouter = require('./Routes/newTourRouter');
const bookingRouter = require('./Routes/bookingRouter');
const myToursRouter = require('./Routes/companyToursRouter');
const myBookingsHandler = require('./Routes/myBookingsRouter');
app.get('/', authHandler.isAuth, (req, res) => {
  res.redirect('/home');
});

// app.use('/login', loginRouter);
// app.use('/signup', signupRouter);
// app.use('/home', homeRouter);
// app.use('/tours', tourRouter);
// app.use('/newTour', newTourRouter);
// app.use('/book', bookingRouter);
// app.use('/myTours', myToursRouter);
// app.use('/myBooking', myBookingsHandler);

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/home', homeRouter);
app.use('/tours', tourRouter);
app.use('/new-tour', newTourRouter);
app.use('/book', bookingRouter);
app.use('/my-tours', myToursRouter);
app.use('/my-bookings', myBookingsHandler);

app.get('/logout', authHandler.isAuth, (req, res) => {
  try {
    const loggedInUser = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    if (loggedInUser) {
      res.clearCookie('jwt');
      return res.redirect('/');
    }
  } catch (err) {
    return res.redirect('/');
  }
});
module.exports = app;

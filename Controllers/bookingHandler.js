const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('./../models/userModel');
const Tour = require('./../models/tourModel');
const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemplate');
require('dotenv').config({ path: './config.env' });
const sendEmail = (customerEmail, tourName, emailTemplate) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NATOURS_EMAIL,
      pass: process.env.NATOURS_PWD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: process.env.NATOURS_EMAIL,
    to: customerEmail,
    subject: `Payment confirmation for ${tourName}`,
    html: emailTemplate,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log(err);
    console.log('Hello before sending the email');
    console.log('Email sent: ', info.response);
  });
};

const addTour = async (userID, bookedTourID) => {
  await User.findByIdAndUpdate(
    userID,
    { $push: { tours: bookedTourID } },
    {
      new: true,
    },
  );
};
//!STRIPE CHECKOUTS
const stripeCheckout = async (req, res, bookedTour, loggedInUser) => {
  //!1)Getting items to be bought
  const boughtItems = {
    price_data: {
      currency: 'usd',
      unit_amount: bookedTour.price * 100,
      product_data: {
        name: bookedTour.name,
        description: bookedTour.summary,
        images: [bookedTour.imageCover],
      },
    },
    quantity: 1,
  };

  //!2) Creating stripe session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/home`,
    cancel_url: `${req.protocol}://${req.get('host')}/home`,
    customer_email: loggedInUser.email,
    line_items: [boughtItems],
    mode: 'payment',
  });
  return session;
};
exports.bookTour = async (req, res) => {
  console.log('Hello from the bookingHandler 😎');
  try {
    //!1) Getting the tour name
    const { name } = req.params;
    //!2) Getting the tour from DB
    const tourName = name.split('-').join(' ');
    const bookedTour = await Tour.findOne({
      name: tourName,
    });

    //!3) Handle the stripe checkout
    const sessionUser = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const loggedInUser = JSON.parse(
      JSON.stringify(
        await User.findOne({
          _id: sessionUser.id,
        }),
      ),
    );
    exports.emailTemplate = emailTemplate.replaceTemplate(
      loggedInUser,
      bookedTour,
    );
    exports.bookedTourID = bookedTour.id;
    exports.tourName = tourName;
    const session = await stripeCheckout(req, res, bookedTour, loggedInUser);

    console.log('Before sending the response');
    res.status(200).json({
      status: 'success',
      session,
    });
  } catch (err) {
    console.log('Error:', err);
    return res.status(400).json({
      status: 'failure',
      message: "couldn't process payment ",
    });
    /* res.redirect('/home'); */
  }
};

exports.webhookCheckout = async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const endpointSecret = process.env.WEBHOOK_SECRET_KEY;
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const customerEmail = session.customer_email;
      addTour(this.sessionUserID, this.bookedTourID);
      sendEmail(customerEmail, this.tourName, this.emailTemplate);
    }
    res.status(200).json({ received: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 'failure',
      message: "couldn't process payment ",
    });
  }
};

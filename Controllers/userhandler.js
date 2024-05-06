// const jwt = require('jsonwebtoken');
// const User = require('./../models/userModel');
// require('dotenv').config({ path: './config.env' });

// exports.getUserData = async (req, res) => {
//   const user = JSON.parse(
//     JSON.stringify(
//       await User.findOne({
//         _id: jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id,
//       }),
//     ),
//   );
//   return user;
// };

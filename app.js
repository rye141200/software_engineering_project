const express = require("express");
const morgan = require("morgan");
const app = express();

// app.use(morgan);
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
  console.log(req.body);
});
app.get("/sign_up", (req, res) => {
  res.sendFile(__dirname + "/public/sign_up.html");
});
module.exports = app;

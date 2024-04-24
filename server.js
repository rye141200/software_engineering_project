const app = require("./app");
const mongoose = require("mongoose");
const port = 9999;

const server = app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

const app = require('./app');
const mongoose = require('mongoose');
const port = 8001;

const server = app.listen(port, () => {
  console.log(`server listening on ${port}`);
});

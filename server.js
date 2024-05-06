const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection successful! ✅');
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`server listening on ${process.env.PORT}`);
});

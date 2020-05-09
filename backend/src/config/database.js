require('dotenv/config');
const mongoose = require('mongoose');

const databaseUrl = process.env.MONGO_URL;

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

require('dotenv/config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const MONGO_URL = `mongodb+srv://admin:${MONGO_PASSWORD}@portfolio.of5cp.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to mongodb!'))
  .catch((error) => console.log(error));

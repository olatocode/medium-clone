/**
 * require dependencies
 *
 * @format
 */

const express = require('express');
const routes = require('./routes/index.route');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = express.Router();

/** configure cloudinary */
cloudinary.config({
  cloud_name: 'chidumennamdi',
  api_key: '',
  api_secret: '',
});

/** set up routes {API Endpoints} */
routes(router);

/** set up middlewares */
app.use(cors());
app.use(helmet());
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router);

/** connect to MongoDB datastore */

const connect_MongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error.message);
    console.log(`Database Not Connected`);
  }
};
connect_MongoDB();

const PORT = 5000;

/** start server */
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});

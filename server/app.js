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
const router = express.Router();
const url = process.env.MONGODB_URL;

/** configure cloudinary */
cloudinary.config({
  cloud_name: 'chidumennamdi',
  api_key: '',
  api_secret: '',
});

/** connect to MongoDB datastore */
try {
  mongoose.connect(url, {
    //useMongoClient: true
  });
} catch (error) {}

let port = 5000 || process.env.PORT;

/** set up routes {API Endpoints} */
routes(router);

/** set up middlewares */
app.use(cors());
app.use(helmet());
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router);

/** start server */
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});

// APPLICATION

// require dotenv
require("dotenv").config();
// require express-async-errors
require("express-async-errors");

// require extra security packages
const helmet = require("helmet");
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// require and invoke express
const express = require("express");
const app = express();

// import connectDB
const connectDB = require("./db/connect");
// import authentication middleware
const authenticateUser = require("./middleware/authentication");

// import routers
const authRouter = require("./routes/auth");
const libraryRouter = require("./routes/library");

// import error handler middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// configure & invoke rate limiter
app.set('trust proxy', 1); // because app will be behind reverse proxy
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  })
  // error message defaults to 'Too many requests, please try again later'
  // default status code response = 429
);

// Comment out the following lines:
// // dummy route
// app.get('/', (req, res) => {
//   // res.send('movie library api');
//   res.send('<h1>Movies API</h1><a href="/api-docs">Documentation</a>');
// });

app.use(express.static('public'));

// invoke json to access data in req.body
app.use(express.json());

// invoke extra packages
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/library", authenticateUser, libraryRouter); // place authentication middleware

// invoke error handling
app.use(notFoundMiddleware);
// invoke error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// listen on port 3000
const port = process.env.PORT || 3000;

// start fuction
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); // connect to DB
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

// invoke start
start();

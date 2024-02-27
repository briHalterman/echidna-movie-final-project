// APPLICATION

// require dotenv
require('dotenv').config();
// require express-async-errors
require('express-async-errors');

// require and invoke express
const express = require('express');
const app = express();

// require connectDB
const connectDB = require('./db/connect');

// require authentication middleware


// require routers
const authRouter = require('./routes/auth');
const libraryRouter = require('./routes/library');

// require error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// configure express.json()
app.use(express.json());

// extra security packages


// routes
  // route for handling get request for path /
  // app.get('/', (req, res) => {
  //   res.send('movie library api');
  // });
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/library', libraryRouter);

// invoke error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// invoke extra packages

// listen on port 3000
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) // connect to DB
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error);
  } 
};

// 
start();
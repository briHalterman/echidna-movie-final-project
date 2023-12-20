// require dotenv
require('dotenv').config();

// extra security packages

// require and invoke express
const express = require('express');
const app = express();

// connect DB
const connectDB = require('./db/connect');

const notFound = require('./middleware/not-found');

// routers

// configure express.json()
app.use(express.json());

//route for handling get request for path /
app.get('/', (req, res) => {
  res.send('movie library api');
});

// error handling
app.use(notFound);

// invoke extra packages

// listen on port 3000
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) // connectDB
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error);
  } 
};

start();
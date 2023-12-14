// require dotenv
require('dotenv').config();

// require and invoke express
const express = require('express');
const app = express();

const connectDB = require('./db/connect');

// middleware

// routes

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
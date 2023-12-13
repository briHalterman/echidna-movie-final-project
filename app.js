// require dotenv
require('dotenv').config();

// require and invoke express
const express = require('express');
const app = express();

// listen on port 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
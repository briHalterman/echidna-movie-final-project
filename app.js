// require and invoke express
const express = require('express');
const app = express();

// listen on port 3000
app.listen(3000, () => {
  console.log('server is listening on port 3000...');
});
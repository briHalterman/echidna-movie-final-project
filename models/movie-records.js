// MOVIE RECORD

// require mongoose
const mongoose = require('mongoose');

const MovieRecordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title'],
    maxlength: 100
  },
  director: {
    type: String,
    maxlength: 100
  },
  year: {
    type: Number, // date?
    min: 1888,
    // current year + 10 in YYYY form
    max: 2034 
    // var maxYear = currentTime.getFullYear() + 10
  }
});

// export movie record
module.exports = mongoose.model('movie-records', MovieRecordSchema);
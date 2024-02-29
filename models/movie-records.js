// MOVIE RECORD

// require mongoose
const mongoose = require("mongoose");

// movie record model schema
const MovieRecordSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
    maxlength: 100,
  },
  director: {
    type: String,
    maxlength: 100,
  },
  year: {
    type: Number, // date?
    min: 1888,
    // current year + 10 in YYYY form
    max: 2034,
    // var maxYear = currentTime.getFullYear() + 10
  },
  catagory: {
    type: String,
    enum: ['catagory', 'narrative', 'avant-garde', 'documentary'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, { timestamps: true });

// export movie record model schema
module.exports = mongoose.model("MovieRecord", MovieRecordSchema);

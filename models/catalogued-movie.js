// CATALOGUED MOVIE MODEL
const mongoose = require('mongoose');

const CataloguedMovieSchema = new mongoose.Schema({

});

module.exports = mongoose.model('catalogued-movie', CataloguedMovieSchema);

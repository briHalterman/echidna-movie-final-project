// MOVIE LIBRARY ROUTER
// protect ALL routes

// require & invoke express
const express = require('express');
const router = express.Router();
// import library controllers
const {
  getUserMovies,
  getMovie,
  createMovie,
  updateMovie,
  removeMovie
} = require('../controllers/library');

// syntax option 2 (personal preference)
router.route('/').post(createMovie).get(getUserMovies); // domain/api/v1/library
router.route('/:id').get(getMovie).delete(removeMovie).patch(updateMovie); // domain/api/v1/library/:id

// export router
module.exports = router;
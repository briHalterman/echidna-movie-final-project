// MOVIE LIBRARY ROUTER

const express = require('express');
const router = express.Router();

const {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  removeMovie
} = require('../controllers/library');

router.route('/').post(createMovie).get(getAllMovies);
router.route('/:id').get(getMovie).delete(removeMovie).patch(updateMovie);

module.exports = router;
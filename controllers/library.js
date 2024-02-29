// MOVIE LIBRARY CONTROLLER
// only deal with resources as they are associated with a user
// implement CRUD (Create, Read, Update, Destroy) funtionality

// import movie record model
const MovieRecord = require('../models/movie-record');
// require status codes package
const { StatusCodes } = require('http-status-codes');
// import errors
const { BadRequestError, NotFoundError } = require('../errors');

// get all movies route controller (read)
const getUserMovies = async (req, res) => {
  const movies = await MovieRecord.find({ createdBy:req.user.userId }).sort('createdAt');
  // response:
  res.status(StatusCodes.OK).json({ movies, count: movies.length });
};

// get individual movie route controller (read)
const getMovie = async (req, res) => {
  // response:
  res.status(200).json({ msg: 'get individual movie'});
};

// create movie route controller (create)
const createMovie = async (req, res) => {
  // get user ID
  req.body.createdBy = req.user.userId;
  // create new movie record
  const movie = await MovieRecord.create(req.body);
  // response:
  res.status(StatusCodes.CREATED).json({ movie });
};

// update movie route controller (update)
const updateMovie = async (req, res) => {
  // response: 
  res.status(200).json({ msg: 'update movie' });
};

// delete movie route controller (destroy)
const removeMovie = async (req, res) => {
  // response:
  res.status(200).json({ msg: 'remove movie' });
};

// export library controllers
module.exports = {
  getUserMovies,
  getMovie,
  createMovie,
  updateMovie,
  removeMovie
};
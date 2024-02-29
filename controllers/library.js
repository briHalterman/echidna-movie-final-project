// MOVIE LIBRARY CONTROLLER
// only deal with resources as they are associated with a user
// implement CRUD (Create, Read, Update, Destroy) funtionality

// import movie record model
const MovieRecord = require("../models/movie-record");
// require status codes package
const { StatusCodes } = require("http-status-codes");
// import errors
const { BadRequestError, NotFoundError } = require("../errors");

// get all movies route controller (read)
const getUserMovies = async (req, res) => {
  const movies = await MovieRecord.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  // response:
  res.status(StatusCodes.OK).json({ movies, count: movies.length });
};

// get individual movie route controller (read)
const getMovie = async (req, res) => {
  const {
    user: { userId },
    params: { id: movieId },
  } = req;
  const movie = await MovieRecord.findOne({
    _id: movieId,
    createdBy: userId,
  });
  if (!movie) {
    throw new NotFoundError(`No movie with id ${movieId}`);
  }
  // response:
  res.status(StatusCodes.OK).json({ movie });
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
  const {
    body: { title, director },
    user: { userId },
    params: { id: movieId },
  } = req;

  if (title === '' || director === '') {
    throw new BadRequestError('Title & Director fields cannot be empty')
  }

  const movie = await MovieRecord.findOneAndUpdate({ _id: movieId, createdBy: userId }, req.body, { new: true, runValidators: true });

  if (!movie) {
    throw new NotFoundError(`No movie with id ${movieId}`);
  }
  // response:
  res.status(StatusCodes.OK).json({ movie });
};

// delete movie route controller (destroy)
const removeMovie = async (req, res) => {
  const {
    user: { userId },
    params: { id: movieId },
  } = req;

  const movie = await MovieRecord.findByIdAndDelete({
    _id: movieId,
    createdBy: userId
  });

  if (!movie) {
    throw new NotFoundError(`No movie with id ${movieId}`);
  }
  // response:
  res.status(StatusCodes.OK).send();
};

// export library controllers
module.exports = {
  getUserMovies,
  getMovie,
  createMovie,
  updateMovie,
  removeMovie,
};

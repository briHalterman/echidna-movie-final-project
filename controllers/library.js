// MOVIE LIBRARY CONTROLLER

const getAllMovies = async (req, res) => {
  // throw new Error('testing async errors');
  res.status(200).json({ msg: 'get all movies' });
};

const getMovie = async (req, res) => {
  res.status(200).json({ msg: 'get individual movie'});
};

const createMovie = async (req, res) => {
  res.status(200).json({ msg: 'create movie' });
};

const updateMovie = async (req, res) => {
  res.status(200).json({ msg: 'update movie' });
};

const removeMovie = async (req, res) => {
  res.status(200).json({ msg: 'remove movie' });
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  removeMovie
};
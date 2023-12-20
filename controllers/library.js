// MOVIE LIBRARY CONTROLLER

const getAllMovies = async (req, res) => {
  res.send('get all movies');
};

const getMovie = async (req, res) => {
  res.send('get individual movie');
};

const createMovie = async (req, res) => {
  res.send('create movie');
};

const updateMovie = async (req, res) => {
  res.send('update movie');
};

const removeMovie = async (req, res) => {
  res.send('remove movie')
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  removeMovie
};
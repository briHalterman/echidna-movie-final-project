// MOVIE LIBRARY CONTROLLER
// only deal with resources as they are associated with a user
// implement CRUD (Create, Read, Update, Delete) funtionality

// create imports


const getAllMovies = async (req, res) => {
  // throw new Error('testing async errors');
  res.status(200).json({ msg: 'get all movies' });
};

const getMovie = async (req, res) => {
  res.status(200).json({ msg: 'get individual movie'});
};

const createMovie = async (req, res) => {
  // res.status(200).json({ msg: 'create movie' });
  res.status(200).json(req.body);
};

const updateMovie = async (req, res) => {
  res.status(200).json({ msg: 'update movie' });
};

const removeMovie = async (req, res) => {
  res.status(200).json({ msg: 'remove movie' });
};

// export library controllers
module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  removeMovie
};
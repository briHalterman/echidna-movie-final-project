// NOT FOUND MIDDLEWARE

// if user is looking for route that does not exist, send back 404 and "Route does not exist"
const notFound = (req, res) => res.status(404).send("Route does not exist");

// export not found middleware
module.exports = notFound;

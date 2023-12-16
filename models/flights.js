const daoFlights = require("../daos/flights");

module.exports = {
  getAll,
  createFlights,
};

function getAll() {
  return daoFlights.find({});
}

function createFlights(flight) {
  return daoFlights.create(flight);
}

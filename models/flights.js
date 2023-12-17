const daoFlights = require("../daos/flights");

module.exports = {
  getAll,
  createFlights,
  getAirline,
};

function getAll() {
  // format departure date/time
  // departs -> toLocaleString // where to get the departs property? daoFLights.find({ departs ????})
  // console.log(daoFlights.departs);
  return daoFlights.find({});
}

function createFlights(flight) {
  return daoFlights.create(flight);
}

async function getAirline(param) {
  //   const flight = await daoFlights.find({ airline: param });
  const flight = await daoFlights.find({
    airline: { $regex: new RegExp(param, "i") },
  });
  if (flight == null || Object.keys(flight).length == 0) {
    return "no flights with such airline";
  } else {
    return flight;
  }
}

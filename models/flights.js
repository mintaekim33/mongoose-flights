const daoFlights = require("../daos/flights");

module.exports = {
  getAll,
  createFlights,
  getAirline,
  getAirport,
  getFlightNo,
  getAscendingDeparts,
  getPastFlights,
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
  // make 'airline' param case insensitive
  const flights = await daoFlights.find({
    airline: { $regex: new RegExp(param, "i") },
  });
  if (flights == null || Object.keys(flights).length == 0) {
    return "no flights with such airline";
  } else {
    return flights;
  }
}

async function getAirport(param) {
  const flights = await daoFlights.find({
    airport: { $regex: new RegExp(param, "i") },
  });
  if (flights == null || Object.keys(flights).length == 0) {
    return "no flights with such airport";
  } else {
    return flights;
  }
}

async function getFlightNo(param) {
  const flights = await daoFlights
    .find({ flightNo: param })
    .select("airport departs -_id");
  if (flights == null || Object.keys(flights).length == 0) {
    return "no flights with such flight number";
  } else {
    return flights;
  }
}

async function getAscendingDeparts() {
  const flights = await daoFlights.find({}).sort({ departs: 1 });
  if (flights == null || Object.keys(flights).length == 0) {
    return "no flights with such departure date";
  } else {
    return flights;
  }
}

async function getPastFlights() {
  const today = new Date();
  const flights = await daoFlights.find({});
  flights.forEach((flight) => {
    if (flight.departs < today) {
      flight.status = "*";
    }
  });
  return flights;
}

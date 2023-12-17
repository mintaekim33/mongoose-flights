const daoFlights = require("../daos/flights");

module.exports = {
  getAll,
  createFlights,
  getAirline,
  getAirport,
  getFlightNo,
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
  const flight = await daoFlights.find({
    airline: { $regex: new RegExp(param, "i") },
  });
  if (flight == null || Object.keys(flight).length == 0) {
    return "no flights with such airline";
  } else {
    return flight;
  }
}

async function getAirport(param) {
  const airport = await daoFlights.find({
    airport: { $regex: new RegExp(param, "i") },
  });
  if (airport == null || Object.keys(airport).length == 0) {
    return "no flights with such airport";
  } else {
    return airport;
  }
}

async function getFlightNo(param) {
  const flightNo = await daoFlights
    .find({ flightNo: param })
    .select("airport departs -_id");
  if (flightNo == null || Object.keys(flightNo).length == 0) {
    return "no flights with such flight number";
  } else {
    return flightNo;
  }
}

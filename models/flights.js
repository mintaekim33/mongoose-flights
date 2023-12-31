const daoFlights = require("../daos/flights");
const daoTickets = require("../daos/tickets");

module.exports = {
  getAll,
  createFlights,
  getAirline,
  getAirport,
  getFlightNo,
  getAscendingDeparts,
  getPastFlights,
  getProps,
  addDestination,
  getListDestinations,
  getListDestinationsByTime,
  getTickets,
  createTickets,
  deleteTickets,
};

function getAll() {
  // console.log(daoFlights.departs);
  return daoFlights.find({});
}

function createFlights(flight) {
  return daoFlights.create(flight);
}

async function getAirline(param) {
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

async function getProps(param) {
  const flightData = await daoFlights.findOne({ flightNo: param });
  if (flightData == null || Object.keys(flightData).length == 0) {
    return "no data for the flight you are looking for :(";
  } else {
    return flightData;
  }
}

async function addDestination(req) {
  // fetch an existing flight document by id
  const flightData = await daoFlights.findById(req.params.id);
  // add destinations for a flight
  flightData.destinations.push(req.body);
  // save the parent doc to persist data in database
  await flightData.save();
  if (flightData == null || Object.keys(flightData).length == 0) {
    return "destinations could not be added for this flight";
  } else {
    return flightData;
  }
}

async function getListDestinations(param) {
  const flightData = await daoFlights.findById(param);
  if (flightData == null || Object.keys(flightData).length == 0) {
    return "there are no destinations for this flight";
  } else {
    return flightData.destinations;
  }
}

async function getListDestinationsByTime(param) {
  const flightData = await daoFlights.findById(param);
  if (flightData == null || flightData.destinations.length === 0) {
    return "there are no destinations for this flight";
  }
  flightData.destinations.sort((a, b) => a.arrival - b.arrival);
  return flightData.destinations;
}

async function getTickets(id) {
  const flightData = await daoFlights.findById(id);
  if (flightData == null || Object.keys(flightData).length == 0) {
    return "there are no tickets for this flight";
  }
  const tickets = await daoTickets.find({ flight: flightData._id });
  return tickets;
}

async function createTickets(req) {
  // The create() function in Mongoose is designed to handle
  // both frontend rendering and backend data persistence in a single step
  const flightData = await daoFlights.findById(req.params.id);
  // add flight property
  req.body.flight = flightData._id;
  return daoTickets.create(req.body);
}

async function deleteTickets(req) {
  const flightData = await daoFlights.findById(req.params.id);
  //   console.log(flightData)
  if (flightData == null || Object.keys(flightData).length == 0) {
    return "ticket could not be deleted";
  }
  const tickets = await daoTickets.find({ flight: flightData._id });
  //   tickets.remove(req.params.ticketId);
  // update frontend
  const updatedTickets = tickets.filter(
    (ticket) => ticket._id.toString() !== req.params.ticketId
  );
  // update backend
  await daoTickets.deleteOne({ _id: req.params.ticketId });
  return updatedTickets;
}

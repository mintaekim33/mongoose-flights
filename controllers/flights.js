const modelFlights = require("../models/flights");

module.exports = {
  getFlights,
  createFlights,
  getAirline,
  getAirport,
  getFlightNo,
  getAscendingDeparts,
  getPastFlights,
  getProps,
  addDestination,
};

async function getFlights(req, res) {
  const flights = await modelFlights.getAll();
  const formattedFlights = flights.map((flight) => ({
    ...flight._doc,
    departs: flight.departs.toLocaleString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  }));
  res.json({ flights: formattedFlights });
}

async function createFlights(req, res) {
  try {
    const flight = await modelFlights.createFlights(req.body);
    res.status(201).json(flight);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getAirline(req, res) {
  const modelData = await modelFlights.getAirline(req.params.airline);
  if (modelData == "no flights with such airline") {
    res.status(404).json("no flights with such airline");
  } else {
    res.json(modelData);
  }
}

async function getAirport(req, res) {
  const modelData = await modelFlights.getAirport(req.params.airport);
  if (modelData == "no flights with such airport") {
    res.status(404).json("no flights with such airport");
  } else {
    res.json(modelData);
  }
}

async function getFlightNo(req, res) {
  const modelData = await modelFlights.getFlightNo(req.params.flightNo);
  if (modelData == "no flights with such flight number") {
    res.status(404).json("no flights with such flight number");
  } else {
    res.json(modelData);
  }
}

async function getAscendingDeparts(req, res) {
  const modelData = await modelFlights.getAscendingDeparts();
  if (modelData == "no flights with such departure date") {
    res.status(404).json("no flights with such departure date");
  } else {
    res.json(modelData);
  }
}

async function getPastFlights(req, res) {
  const modelData = await modelFlights.getPastFlights();
  if (modelData == "no past flights") {
    res.status(404).json("no past flights");
  } else {
    res.json(modelData);
  }
}

async function getProps(req, res) {
  try {
    const modelData = await modelFlights.getProps(req.params.flightNo);
    if (modelData == "no data for the flight you are looking for :(") {
      res.status(404).json("no data for the flight you are looking for :(");
    } else {
      res.json(modelData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addDestination(req, res) {
  // fetch an existing flight document by id
  const flight = await modelFlights.findById(req.params.id);
  // add destinations for a flight
  flight.destinations.push(req.body);
  try {
    // save the parent doc
    await flight.save();
  } catch (err) {
    res.status(500).json({ err });
  }
  res.status(201).json(flight);
}

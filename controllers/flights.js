const modelFlights = require("../models/flights");

module.exports = {
  getFlights,
  createFlights,
  getAirline,
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

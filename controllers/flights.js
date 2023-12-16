const modelFlights = require("../models/flights");

module.exports = {
  getFlights,
  createFlights,
};

async function getFlights(req, res) {
  res.json({
    flights: await modelFlights.getAll(),
  });
}

function createFlights(req, res) {
  try {
    const flight = modelFlights.createFlights(req.body);
    // res.status(201).json(flight);
  } catch (err) {
    // console.log(err);
    // res.status(500).json({ errorMsg: err.message });
  }
}

var express = require("express");
var router = express.Router();
var flightController = require("../controllers/flights.js");

// GET /flights view all flights with airline, airport, flightNo, departure
router.get("/", flightController.getFlights);

// POST /flights/create
router.post("/create", flightController.createFlights);

// GET /flights/airline/:airline
router.get("/airline/:airline", flightController.getAirline);

// GET /flights/airport/:airport
router.get("/airport/:airport", flightController.getAirport);

// GET /flights/flightNo/:flightNo
router.get("/flightNo/:flightNo", flightController.getFlightNo);

module.exports = router;

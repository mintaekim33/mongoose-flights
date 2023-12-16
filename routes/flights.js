var express = require("express");
var router = express.Router();
var flightController = require("../controllers/flights.js");

// GET /flights view all flights with airline, airport, flightNo, departure
router.get("/", flightController.getFlights);

// POST /flights/create
router.post("/create", flightController.createFlights);

module.exports = router;

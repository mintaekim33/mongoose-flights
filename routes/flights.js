var express = require("express");
var router = express.Router();
var flightController = require("../controllers/flights.js");

// base path: /flights
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

// GET /flights/ascending
router.get("/ascending", flightController.getAscendingDeparts);

// GET /flights/past
router.get("/past", flightController.getPastFlights);

/** Part 2
 * "I want to submit a flight info and view all of the properties for that flight." ??
 */
// GET /flights/properties/:info
router.get("/:flightNo/properties", flightController.getProps);

router.put("/:id/destination", flightController.addDestination);

module.exports = router;

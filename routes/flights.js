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

// GET /flights/:flightNo/properties
router.get("/:flightNo/properties", flightController.getProps);

// PUT /flights/:id/destination
router.put("/:id/destination", flightController.addDestination);

// GET /flights/:id/listDestinations
router.get("/:id/listDestinations", flightController.getListDestinations);

// GET /flights/:id/listDestinationsByTime
router.get(
  "/:id/listDestinationsByTime",
  flightController.getListDestinationsByTime
);

// GET /flights/:id/tickets
router.get("/:id/tickets", flightController.getTickets);

// POST /flights/:id/tickets/new
router.post("/:id/tickets/new", flightController.createTickets);

// DELETE /flights/:id/tickets/delete
router.delete("/:id/:ticketId/delete", flightController.deleteTickets);

module.exports = router;

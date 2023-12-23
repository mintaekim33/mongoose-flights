const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
  },
  arrival: {
    type: Date,
  },
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Asian", "European"],
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    default: "DEN",
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: function () {
      const today = new Date();
      const nextYear = today.getFullYear() + 1;
      return new Date(nextYear, today.getMonth(), today.getDate());
    },
  },
  status: {
    type: String,
    default: "upcoming",
  },
  destinations: [destinationSchema],
});

module.exports = mongoose.model("Flights", flightSchema);

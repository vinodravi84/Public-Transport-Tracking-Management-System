const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
});

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distanceKm: Number,
  avgSpeedKmph: { type: Number, default: 50 },
  stops: [stopSchema],
}, { timestamps: true });

module.exports = mongoose.model("Route", routeSchema);

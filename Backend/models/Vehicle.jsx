const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  vehicleId: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);

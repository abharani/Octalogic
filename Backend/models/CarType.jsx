const mongoose = require("mongoose");

const CarTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("CarType", CarTypeSchema);

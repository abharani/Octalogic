const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  vehicleId: { type: Number, required: true },
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = require("./app.js");

const CarType = require("./Backend/models/CarType");
const BikeType = require("./Backend/models/BikeType");
const Vehicle = require("./Backend/models/Vehicle");
const Booking = require("./Backend/models/Booking");

const port = process.env.PORT || 4000;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/octalogic";
console.log(DATABASE_URL);
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());

app.get("/car-types", async (req, res) => {
  const carTypes = await CarType.find();
  res.json(carTypes);
});

app.get("/bike-types", async (req, res) => {
  const bikeTypes = await BikeType.find();
  res.json(bikeTypes);
});

app.get("/vehicles", async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

app.post("/book", async (req, res) => {
  const { vehicleId, dateFrom, dateTo, firstName, lastName, email, phone } =
    req.body;

  const existingBooking = await Booking.findOne({
    vehicleId,
    $or: [{ dateFrom: { $lte: dateTo }, dateTo: { $gte: dateFrom } }],
  });

  if (existingBooking) {
    return res
      .status(400)
      .json({ message: "Vehicle already booked for these dates" });
  }

  const newBooking = new Booking({
    vehicleId,
    dateFrom,
    dateTo,
    firstName,
    lastName,
    email,
    phone,
  });
  await newBooking.save();
  res.status(201).json({ message: "Vehicle booked successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

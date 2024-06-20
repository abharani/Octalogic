const mongoose = require("mongoose");
const CarType = require("./Backend/models/CarType");
const BikeType = require("./Backend/models/BikeType");
const Vehicle = require("./Backend/models/Vehicle");

//url

const seedData = async () => {
  await mongoose.connection.dropDatabase();

  const carTypes = await CarType.insertMany([
    { name: "Hatchback" },
    { name: "SUV" },
    { name: "Sedan" },
  ]);

  const bikeTypes = await BikeType.insertMany([
    { name: "Cruiser" },
    { name: "Sports" },
  ]);

  await Vehicle.insertMany([
    { type: "Hatchback", name: "Hatchback Car 1", vehicleId: 1 },
    { type: "SUV", name: "SUV Car 1", vehicleId: 2 },
    { type: "Sedan", name: "Sedan Car 1", vehicleId: 3 },
    { type: "Cruiser", name: "Cruiser Bike 1", vehicleId: 4 },
    { type: "Sports", name: "Sports Bike 1", vehicleId: 5 },
  ]);

  console.log("Database seeded successfully");
  mongoose.connection.close();
};

seedData().catch((err) => console.error(err));
import React, { useState, useEffect } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    numberOfWheels: "",
    vehicleType: "",
    vehicleId: "",
    dateFrom: "",
    dateTo: "",
  });
  const [carTypes, setCarTypes] = useState([]);
  const [bikeTypes, setBikeTypes] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const carTypesResponse = await fetch("http://localhost:3000/car-types");
      const carTypesData = await carTypesResponse.json();
      setCarTypes(carTypesData);

      const bikeTypesResponse = await fetch("http://localhost:3000/bike-types");
      const bikeTypesData = await bikeTypesResponse.json();
      setBikeTypes(bikeTypesData);
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch("http://localhost:3000/vehicles");
      const data = await response.json();
      setVehicleOptions(data);
    };
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 5) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Vehicle booked successfully");
      setFormData({
        firstName: "",
        lastName: "",
        numberOfWheels: "",
        vehicleType: "",
        vehicleId: "",
        dateFrom: "",
        dateTo: "",
      });
      setStep(1);
    } else {
      const result = await response.json();
      alert(result.message);
    }
  };

  const filteredVehicleTypes =
    formData.numberOfWheels === "2" ? bikeTypes : carTypes;
  const filteredVehicleOptions = vehicleOptions.filter(
    (vehicle) => vehicle.type === formData.vehicleType
  );

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !formData.firstName || !formData.lastName;
      case 2:
        return !formData.numberOfWheels;
      case 3:
        return !formData.vehicleType;
      case 4:
        return !formData.vehicleId;
      case 5:
        return !formData.dateFrom || !formData.dateTo;
      default:
        return true;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        {step === 1 && (
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-2 py-1 border"
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-2 py-1 border"
            />
          </div>
        )}
        {step === 2 && (
          <div>
            <label>Number of Wheels:</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="numberOfWheels"
                  value="2"
                  checked={formData.numberOfWheels === "2"}
                  onChange={handleChange}
                />{" "}
                2
              </label>
              <label>
                <input
                  type="radio"
                  name="numberOfWheels"
                  value="4"
                  checked={formData.numberOfWheels === "4"}
                  onChange={handleChange}
                />{" "}
                4
              </label>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <label>Type of Vehicle:</label>
            <div className="flex flex-col space-y-2">
              {filteredVehicleTypes.map((option) => (
                <label key={option._id}>
                  <input
                    type="radio"
                    name="vehicleType"
                    value={option.name}
                    checked={formData.vehicleType === option.name}
                    onChange={handleChange}
                  />{" "}
                  {option.name}
                </label>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div>
            <label>Specific Model:</label>
            <div className="flex flex-col space-y-2">
              {filteredVehicleOptions.map((option) => (
                <label key={option._id}>
                  <input
                    type="radio"
                    name="vehicleId"
                    value={option._id}
                    checked={formData.vehicleId === option._id}
                    onChange={handleChange}
                  />{" "}
                  {option.name}
                </label>
              ))}
            </div>
          </div>
        )}
        {step === 5 && (
          <div>
            <label>Date From:</label>
            <input
              type="date"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              className="w-full px-2 py-1 border"
            />
            <label>Date To:</label>
            <input
              type="date"
              name="dateTo"
              value={formData.dateTo}
              onChange={handleChange}
              className="w-full px-2 py-1 border"
            />
          </div>
        )}
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-300"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className={`px-4 py-2 ${
              isNextDisabled() ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
            disabled={isNextDisabled()}
          >
            {step === 5 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;

import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CreateVenue = () => {
  const initialFormData = {
    name: "",
    address: "",
    owner: "",
    capacity: "",
    layout: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/venue/create",
        formData
      );
      if (response.data.success) {
        setFormData(initialFormData);
        alert("Venue creado exitosamente");
      } else {
        setErrorMessage(response.data.msg || "Error al crear el venue");
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="myEvents">
      <div>
        <Navbar />
      </div>
      <div className="main-content">
        <div className="admin-container">
          <div>
            <Link to="/myevents">
              <h3 className="myevents-title">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA0ElEQVR4nO3YuQrCQBRG4YO+laWouHRu2Gip4kNro41gIeICLpGBKSQkWCjRe/k/mD6HJJM7ARERERGRAvWBLbAHxhg1Am5AEleIKWPMALi+RIS1A0oY0suICHdmiCFt4JKKuAMTDGllRDyAKYY0gXNGxAxDGjkRcwyp50QsMKQGnKxHVIFjKqLItYqby0cqwOGHEUlca4X80aO1jFv+V7h42V1tv64+iK5GFFdDo6sx/t3BKpzf8XDU3eDk58MGw7oxIMxFnV9fjIiIiIgIaU9zyuryINMk1gAAAABJRU5ErkJggg==" />
                Go Back
              </h3>
            </Link>
          </div>
          <div className="admin-container1">
            <p>Available</p>
            <p>Expired</p>
            <p>Current</p>
            <p>Past</p>
            <p className="selected">Create</p>
          </div>
          <div className="admin-container1">
            <p className="selected">Venues</p>
            <p>Concert</p>
            <p>Night Club</p>
            <p>Private</p>
            <p>Other</p>
          </div>
          <hr className="admin-hr" />
        </div>

        <div>
          <form onSubmit={handleSubmit} className="form-venue">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name of the venue"
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              placeholder="Owner"
            />
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Capacity"
            />
            {/* Aquí puedes agregar inputs para el layout y otros campos que necesites */}
            <button type="submit">Create Venue</button>
            <h3 className="venue-error">{errorMessage}</h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateVenue;

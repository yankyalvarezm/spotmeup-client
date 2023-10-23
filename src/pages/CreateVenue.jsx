import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import AllVenues from "../components/AllVenues";

const CreateVenue = () => {
  const initialFormData = {
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    owner: "",
    capacity: "",
    description: "",
    layout: [],
  };

  const [updateTrigger, setUpdateTrigger] = useState(0);
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
        setUpdateTrigger((prev) => prev + 1);
      } else {
        setErrorMessage(response.data.msg || "Error al crear el venue");
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error. Por favor, intenta nuevamente.");
    }
  };

  const US_STATES = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "Arkansas", abbreviation: "AR" },
    { name: "California", abbreviation: "CA" },
    { name: "Colorado", abbreviation: "CO" },
    { name: "Connecticut", abbreviation: "CT" },
    { name: "Delaware", abbreviation: "DE" },
    { name: "Florida", abbreviation: "FL" },
    { name: "Georgia", abbreviation: "GA" },
    { name: "Hawaii", abbreviation: "HI" },
    { name: "Idaho", abbreviation: "ID" },
    { name: "Illinois", abbreviation: "IL" },
    { name: "Indiana", abbreviation: "IN" },
    { name: "Iowa", abbreviation: "IA" },
    { name: "Kansas", abbreviation: "KS" },
    { name: "Kentucky", abbreviation: "KY" },
    { name: "Louisiana", abbreviation: "LA" },
    { name: "Maine", abbreviation: "ME" },
    { name: "Maryland", abbreviation: "MD" },
    { name: "Massachusetts", abbreviation: "MA" },
    { name: "Michigan", abbreviation: "MI" },
    { name: "Minnesota", abbreviation: "MN" },
    { name: "Mississippi", abbreviation: "MS" },
    { name: "Missouri", abbreviation: "MO" },
    { name: "Montana", abbreviation: "MT" },
    { name: "Nebraska", abbreviation: "NE" },
    { name: "Nevada", abbreviation: "NV" },
    { name: "New Hampshire", abbreviation: "NH" },
    { name: "New Jersey", abbreviation: "NJ" },
    { name: "New Mexico", abbreviation: "NM" },
    { name: "New York", abbreviation: "NY" },
    { name: "North Carolina", abbreviation: "NC" },
    { name: "North Dakota", abbreviation: "ND" },
    { name: "Ohio", abbreviation: "OH" },
    { name: "Oklahoma", abbreviation: "OK" },
    { name: "Oregon", abbreviation: "OR" },
    { name: "Pennsylvania", abbreviation: "PA" },
    { name: "Rhode Island", abbreviation: "RI" },
    { name: "South Carolina", abbreviation: "SC" },
    { name: "South Dakota", abbreviation: "SD" },
    { name: "Tennessee", abbreviation: "TN" },
    { name: "Texas", abbreviation: "TX" },
    { name: "Utah", abbreviation: "UT" },
    { name: "Vermont", abbreviation: "VT" },
    { name: "Virginia", abbreviation: "VA" },
    { name: "Washington", abbreviation: "WA" },
    { name: "West Virginia", abbreviation: "WV" },
    { name: "Wisconsin", abbreviation: "WI" },
    { name: "Wyoming", abbreviation: "WY" },
  ];

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
        </div>

        <div>
          <form onSubmit={handleSubmit} className="form-venue">
            <h1 className="createvenue-title">New Venue</h1>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="  Name of the venue"
            />
            <div className="form-venue2">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="  Address"
              />
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="  Capacity"
              />
            </div>
            <div className="form-venue2">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a state
                </option>
                {US_STATES.map((state, index) => (
                  <option key={index} value={state.abbreviation}>
                    {state.name} {state.abbreviation}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="  City"
              />
            </div>
            <div className="form-venue2">
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                placeholder="  Zip Code"
              />
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="  Owner"
              />
            </div>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="  Description"
            />
            <button type="submit">Create Venue</button>
            <h3 className="venue-error">{errorMessage}</h3>
            <hr className="admin-hr" />
          </form>
          <AllVenues updateTrigger={updateTrigger} />{" "}
        </div>
      </div>
    </div>
  );
};

export default CreateVenue;

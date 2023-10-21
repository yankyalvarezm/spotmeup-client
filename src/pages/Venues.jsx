import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import AllVenues from "../components/AllVenues";
import { Link } from "react-router-dom";

const Venues = () => {
  const [showAllVenues, setShowAllVenues] = useState(false);

  const handleAllVenuesClick = () => {
    setShowAllVenues(true);
  };

  return (
    <div className="myEvents">
      {/* <div> */}
      <Navbar />
      {/* </div> */}
      <div className="main-content">
        <div className="main-content-container">
          <h1 className="main-content-title">Venues</h1>
          <div className="main-content-filter">
            <h4 onClick={handleAllVenuesClick}>All Venues</h4>
            <h4>Capacity</h4>
            <h4>Status</h4>
          </div>

          <hr className="admin-hr" />
          {showAllVenues && <AllVenues />}
        </div>
      </div>
    </div>
  );
};

export default Venues;

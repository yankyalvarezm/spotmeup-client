import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const myEvents = () => {
  return (
    <div className="myEvents">
      {/* <div> */}
      <Navbar />
      {/* </div> */}
      <div className="main-content">
        <div className="admin-container">
          <div>
            <h3 className="myevents-title">Summary</h3>
          </div>
          <div className="admin-container1">
            <p>Available</p>
            <p>Expired</p>
            <p>Current</p>
            <p>Past</p>
            <Link to="/myevents/create">
              <p>Create</p>
            </Link>
          </div>
          {/* <div className="admin-container1">
            <p>Venues</p>
            <p>Concert</p>
            <p>Night Club</p>
            <p>Private</p>
            <p>Other</p>
          </div> */}
          <hr className="admin-hr" />
        </div>
      </div>
    </div>
  );
};

export default myEvents;

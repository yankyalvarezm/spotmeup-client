import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <div className="myEvents">
      {/* <div> */}
      <Navbar />
      {/* </div> */}
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
            <Link to="/myevents/create/venue">
              <p>Venue</p>
            </Link>
            <Link to="/myevents/create/concert">
              <p>Concert</p>
            </Link>
            <p>Night Club</p>
            <p>Private</p>
            <p>Other</p>
          </div>
          <hr className="admin-hr" />
        </div>
      </div>
    </div>
  );
};

export default Create;

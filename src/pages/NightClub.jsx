import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const NightClub = () => {
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
            <p className="selected">concert</p>
          </div>
          <div className="admin-container1">
            <Link to="/myevents/create/venue">
              <p>Venue</p>
            </Link>
            <Link to="/myevents/create/concert">
              <p>Concert</p>
            </Link>

            <p className="selected">Night</p>

            <Link to="/myevents/create/private">
              <p>Private</p>
            </Link>
            <Link>
              <p>Other</p>
            </Link>
          </div>
        </div>
        <div>
          <form action="" className="form-venue">
            <h1 className="createvenue-title">Night Club</h1>
            <input type="text" name="name" placeholder="  Name of the venue" />
            <div className="form-venue2">
              <input placeholder="  Address" />
              <input placeholder="  Capacity" />
            </div>

            <div className="form-venue2">
              <input placeholder="  Zip Code" />
              <input placeholder="  Owner" />
            </div>

            <input placeholder="  Description" />
            <button type="submit">Create Concert</button>
            <h3 className="venue-error"></h3>
            <hr className="admin-hr" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NightClub;

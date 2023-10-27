import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  scrollAmount = 0;

  handleScroll = (direction) => {
    let scrollValue;

    if (direction === "left") {
      scrollValue = this.scrollAmount - 200;
    } else {
      scrollValue = this.scrollAmount + 200;
    }

    document.querySelector(
      ".home-disappear-content"
    ).style.transform = `translateX(${scrollValue}px)`;
    this.scrollAmount = scrollValue;
  };

  render() {
    return (
      <div className="myEvents">
        <Navbar />
        <div className="main-content">
          <div className="admin-container">
            <div>
              <h3 className="myevents-title">Home</h3>
            </div>
            <hr className="admin-hr" />
            <div className="home-container">
              <div>
                <div className="sampleimage-cont">
                  <h1>Sample Event Image</h1>
                  <div className="sampleimage-cont-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>

              <h2>All Cool Concerts</h2>
              <div
                className="home-content-cont"
                onClick={(e) => {
                  if (e.clientX < window.innerWidth / 2) {
                    this.handleScroll("left");
                  } else {
                    this.handleScroll("right");
                  }
                }}
              >
                <div
                  className="arrow left"
                  onClick={() => this.handleScroll("left")}
                >
                  &#8592;
                </div>
                <h4>Cool Concerts</h4>
                <div className="home-disappear-content">
                  <div className="event-card">Some Concert</div>
                  <div className="event-card">Some Concert</div>
                  <div className="event-card">Some Concert</div>
                  <div className="event-card">Some Concert</div>
                  <div className="event-card">Some Concert</div>
                  <div className="event-card">Some Concert</div>
                  <div className="event-card">Some Concert</div>
                  <div className="event-card">Some Concert</div>
                  <div className="event-card">Some Concert</div>
                  <div className="event-card">Some Concert</div>
                  <div className="event-card">Some Concert</div>
                </div>
                <div
                  className="arrow right"
                  onClick={() => this.handleScroll("right")}
                >
                  &#8594;
                </div>
              </div>
            </div>

            <div className="home-container">
              <h2>New Night Clubs</h2>
              <div
                className="home-content-cont"
                onClick={(e) => {
                  if (e.clientX < window.innerWidth / 2) {
                    this.handleScroll("left");
                  } else {
                    this.handleScroll("right");
                  }
                }}
              >
                <div
                  className="arrow left"
                  onClick={() => this.handleScroll("left")}
                >
                  &#8592;
                </div>
                <h4>See All </h4>
                <div className="home-disappear-content">
                  <div className="event-card">Club #1</div>
                  <div className="event-card">Club #2</div>
                  <div className="event-card">Club #3</div>
                  <div className="event-card">Club #4</div>
                  <div className="event-card">Club #5</div>
                  <div className="event-card">Club #6</div>
                  <div className="event-card">Club #7</div>
                  <div className="event-card">Club #8</div>
                  <div className="event-card">Club #9</div>
                  <div className="event-card">Club #10</div>
                  <div className="event-card">Club #11</div>
                </div>
                <div
                  className="arrow right"
                  onClick={() => this.handleScroll("right")}
                >
                  &#8594;
                </div>
              </div>
            </div>

            <div className="home-container">
              <h2>Top Events</h2>
              <div
                className="home-content-cont"
                onClick={(e) => {
                  if (e.clientX < window.innerWidth / 2) {
                    this.handleScroll("left");
                  } else {
                    this.handleScroll("right");
                  }
                }}
              >
                <div
                  className="arrow left"
                  onClick={() => this.handleScroll("left")}
                >
                  &#8592;
                </div>
                <h4>See All </h4>
                <div className="home-disappear-content">
                  <div className="event-card">Event #1</div>
                  <div className="event-card">Event #2</div>
                  <div className="event-card">Event #3</div>
                  <div className="event-card">Event #4</div>
                  <div className="event-card">Event #5</div>
                  <div className="event-card">Event #6</div>
                  <div className="event-card">Event #7</div>
                  <div className="event-card">Event #8</div>
                  <div className="event-card">Event #9</div>
                  <div className="event-card">Event #10</div>
                  <div className="event-card">Event #11</div>
                </div>
                <div
                  className="arrow right"
                  onClick={() => this.handleScroll("right")}
                >
                  &#8594;
                </div>
              </div>
            </div>

            <div className="home-container">
              <h2>Recently Uploaded</h2>
              <div
                className="home-content-cont"
                onClick={(e) => {
                  if (e.clientX < window.innerWidth / 2) {
                    this.handleScroll("left");
                  } else {
                    this.handleScroll("right");
                  }
                }}
              >
                <div
                  className="arrow left"
                  onClick={() => this.handleScroll("left")}
                >
                  &#8592;
                </div>
                <h4>See All </h4>
                <div className="home-disappear-content">
                  <div className="event-card">Upload #1</div>
                  <div className="event-card">Upload #2</div>
                  <div className="event-card">Upload #3</div>
                  <div className="event-card">Upload #4</div>
                  <div className="event-card">Upload #5</div>
                  <div className="event-card">Upload #6</div>
                  <div className="event-card">Upload #7</div>
                  <div className="event-card">Upload #8</div>
                  <div className="event-card">Upload #9</div>
                  <div className="event-card">Upload #10</div>
                  <div className="event-card">Upload #11</div>
                </div>
                <div
                  className="arrow right"
                  onClick={() => this.handleScroll("right")}
                >
                  &#8594;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AllVenues = ({ updateTrigger }) => {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/venue/allvenues"
        );
        console.log("Line 14 - Venues:", response.data);

        if (response.data.success && Array.isArray(response.data.venue)) {
          setVenues(response.data.venue);
        } else {
          setVenues([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, [updateTrigger]);

  if (isLoading) {
    return <div>Loading venues...</div>;
  }

  if (venues.length === 0) {
    return <h1 className="not-available">No venues available</h1>;
  }

  return (
    <div>
      <h2 className="all-venues">All Venues</h2>
      <div className="all-venues-container">
        {venues.map((venue) => (
          <div key={venue._id} className="all-venues-data">
            <h2>{venue.name}</h2>
            <div className="venues-data-grid">
              <div className="venues-flex">
                <p className="venue-cat">Address</p>
                <p>{venue.address}</p>
              </div>

              <div className="venues-flex">
                <p className="venue-cat">Capacity</p>
                <p>{venue.capacity}</p>
              </div>
              <div className="venues-flex">
                <p className="venue-cat">Owner</p>
                <p>{venue.owner}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVenues;

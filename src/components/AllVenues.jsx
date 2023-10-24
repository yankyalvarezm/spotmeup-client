import React, { useEffect, useState } from "react";
import axios from "axios";
import editIcon from "../../public/images/edit-icon.png";
import CreateModal from "./CreateModal";
import { Link } from "react-router-dom";

const AllVenues = ({ updateTrigger }) => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchVenues = async () => {
    try {
      const response = await axios.get("http://localhost:3000/venue/allvenues");

      if (response.data.success) {
        setVenues(response.data.venue);
        console.log("Line 21 - Venues:", response.data);
      } else {
        setVenues([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching venues:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [updateTrigger, refresh]);

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
  };

  const closeModal = () => {
    setSelectedVenue(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedVenue(prevState => {
        let updatedVenue = {...prevState};

        if (name === "layout") {
            updatedVenue.layout = [...prevState.layout, value];
        } else {
            updatedVenue[name] = value;
        }

        console.log("Line 49 - Selected Venue antes de actualización:", prevState);
        console.log("Line 50 - e.target", e.target);
        console.log("Line 51 - Selected Venue después de actualización:", updatedVenue);

        return updatedVenue;
    });
};


  const handleSaveChanges = async () => {
    console.log("line 53", selectedVenue);
    try {
      const { data } = await axios.put(
        `http://localhost:3000/venue/edit/${selectedVenue._id}`,
        selectedVenue
      );

      if (data.success) {
        const updatedVenue = data.venue;

        const updatedVenues = venues.map((venue) =>
          venue._id === updatedVenue._id ? updatedVenue : venue
        );

        setVenues(updatedVenues);
      }
      setIsEditing(false);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

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
          <div
            key={venue._id}
            className="all-venues-data"
            onClick={() => handleVenueClick(venue)}
          >
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
      <div>
        <CreateModal
          selectedVenue={selectedVenue}
          closeModal={closeModal}
          isEditing={isEditing}
          handleEditClick={handleEditClick}
          handleInputChange={handleInputChange}
          handleSaveChanges={handleSaveChanges}
          fetchVenues={fetchVenues}
          refresh={refresh}
          setRefresh={setRefresh}
          venues={venues}
        />
      </div>
    </div>
  );
};

export default AllVenues;

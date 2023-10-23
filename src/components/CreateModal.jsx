import React from "react";
import editIcon from "../../public/images/edit-icon.png";
import trashIcon from "../../public/images/trash-icon.png";
import { useState } from "react";
import axios from "axios";

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

const CreateModal = ({
  selectedVenue,
  closeModal,
  isEditing,
  handleEditClick,
  handleInputChange,
  handleSaveChanges,
  refresh,
  setRefresh,
}) => {

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);



  const handleDeleteVenue = async () => {

    try {
      const { data } = await axios.delete(
        `http://localhost:3000/venue/delete/${selectedVenue._id}`,
        { data: selectedVenue }
      );

      if (data.success) {

        const updatedVenue = data.venue;

        const updatedVenues = venues.filter(venue => venue._id !== updatedVenue._id);

        setVenues(updatedVenues);
      }

      setRefresh(!refresh);
      console.log('Line 92 - Refresh:', refresh);
    } catch (error) {
      console.error("Error deleting venue:", error);
    }

    console.log('Line 97 - Delete Confirmation:', showDeleteConfirmation)

    setShowDeleteConfirmation(false); 
    console.log('Line 100 - Show delete:', showDeleteConfirmation)
    closeModal(); 
  };

  if (!selectedVenue) return null;

  return (
    <>


      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal">
        <div className="modal-title">
          <h2>{selectedVenue.name}</h2>
          <div className="modal-icons-container">

            <div
              className={isEditing ? "venue-edit" : "edit-image"}
              onClick={() => {
                setShowDeleteConfirmation(false);
                console.log('Line 127 - Show delete:', showDeleteConfirmation)
                isEditing ? handleSaveChanges() : handleEditClick()
              }}

            >
              {isEditing ? (
                <button className="venue-edit-save-changes">Save Changes</button>
              ) : (
                <img src={editIcon} alt="edit-icon" />
              )}
            </div>
            {isEditing ? (
              <div className="traash-icon-contarwiner" >

              </div>
            ) : (
                <div className="traash-icon-container" >
                  <img src={trashIcon} alt="trash icon" id="trash-icon" onClick={() => {
                    setShowDeleteConfirmation(true)
                    console.log('Line 145 - Show delete:', showDeleteConfirmation)
                  }} />
                </div>
            )}




          </div>
        </div>
        <div className="modal-container">
          {showDeleteConfirmation && (
            <div className="delete-confirmation-modal">
              <p>U sure?</p>
              <div className="delete-confirmation-btn">
                <button onClick={() => handleDeleteVenue()}>Sí</button>
                <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
              </div>
            </div>
          )}
          {isEditing ? (
            <div className="edit-input-container1">
              <p className="nameofvenue-edit">Name of venue</p>
              <input
                type="text"
                name="name"
                value={selectedVenue.name}
                onChange={handleInputChange}
                placeholder="  Name of the venue"
              />
              <div className="edit-title-input">
                <p>Addres</p>
                <p>Capacity</p>
              </div>
              <div className="edit-input-container">
                <input
                  type="text"
                  name="address"
                  value={selectedVenue.address}
                  onChange={handleInputChange}
                  placeholder="  Address"
                />
                <input
                  type="number"
                  name="capacity"
                  value={selectedVenue.capacity}
                  onChange={handleInputChange}
                  placeholder="  Capacity"
                />
              </div>
              <div className="edit-title-input">
                <p>State</p>
                <p>City</p>
              </div>
              <div className="edit-input-container">
                <select
                  name="state"
                  value={selectedVenue.state}
                  onChange={handleInputChange}
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
                  value={selectedVenue.city}
                  onChange={handleInputChange}
                  placeholder="  City"
                />
              </div>
              <div className="edit-title-input">
                <p>Zip Code</p>
                <p>Owner</p>
              </div>
              <div className="edit-input-container">
                <input
                  type="text"
                  name="zipcode"
                  value={selectedVenue.zipcode}
                  onChange={handleInputChange}
                  placeholder="  Zip Code"
                />
                <input
                  type="text"
                  name="owner"
                  value={selectedVenue.owner}
                  onChange={handleInputChange}
                  placeholder="  Owner"
                />
              </div>
              <p className="nameofvenue-edit">Description</p>
              <input
                type="text"
                name="description"
                value={selectedVenue.description}
                onChange={handleInputChange}
                placeholder="  Description"
              />
            </div>
          ) : (
            <div className={showDeleteConfirmation ? 'hide' : 'unhide'}>
              <p>
                <span>Address:</span> {selectedVenue.address}
              </p>
              <p>
                <span>City:</span> {selectedVenue.city}
              </p>
              <p>
                <span>State:</span> {selectedVenue.state}
              </p>
              <p>
                <span>Zip Code:</span> {selectedVenue.zipcode}
              </p>
              <p>
                <span>Capacity:</span> {selectedVenue.capacity}
              </p>
              <p>
                <span>Owner:</span>
                {selectedVenue.owner}
              </p>
              <p>
                <span>Desciption:</span>
                {selectedVenue.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateModal;
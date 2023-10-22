import React from "react";
import editIcon from "../../public/images/edit-icon.png";

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
}) => {
  if (!selectedVenue) return null;

  return (
    <>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal">
        <div className="modal-title">
          <h2>{selectedVenue.name}</h2>
          <div
            className={isEditing ? "venue-edit" : "edit-image"}
            onClick={isEditing ? handleSaveChanges : handleEditClick}
          >
            {isEditing ? (
              <button className="venue-edit-save-changes">Save Changes</button>
            ) : (
              <img src={editIcon} alt="edit-icon" />
            )}
          </div>
        </div>
        <div className="modal-container">
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
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateModal;

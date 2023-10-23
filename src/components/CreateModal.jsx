import React, { useState } from "react";
import axios from "axios";
import editIcon from "../../public/images/edit-icon.png";
import trashIcon from "../../public/images/trash-icon.png";

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
  { name: "Wyoming", abbreviation: "WY" }
];

const CreateModal = ({ selectedVenue, closeModal, isEditing, handleEditClick, handleInputChange, handleSaveChanges, refresh, setRefresh, venues, setVenues, fetchVenues = { fetchVenues } }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteVenue = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/venue/delete/${selectedVenue._id}`, { data: selectedVenue });
      if (data.success) {
        fetchVenues();  // Ahora estás usando la función fetchVenues del padre
        setRefresh(!refresh);
        console.log('Line 68 - Page Refresh', refresh)
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
    setShowDeleteConfirmation(false);
    closeModal();
  };

  if (!selectedVenue) return null;

  return (  
    <>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal">
        <ModalHeader
          selectedVenue={selectedVenue}
          isEditing={isEditing}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          handleEditClick={handleEditClick}
          handleSaveChanges={handleSaveChanges}
        />
        <ModalContainer
          showDeleteConfirmation={showDeleteConfirmation}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          handleDeleteVenue={handleDeleteVenue}
          isEditing={isEditing}
          selectedVenue={selectedVenue}
          handleInputChange={handleInputChange}
        />
      </div>
    </>
  );
};

const ModalHeader = ({ selectedVenue, isEditing, setShowDeleteConfirmation, handleEditClick, handleSaveChanges }) => (
  <div className="modal-title">
    <h2>{selectedVenue.name}</h2>
    <div className="modal-icons-container">
      <EditIcon isEditing={isEditing} setShowDeleteConfirmation={setShowDeleteConfirmation} handleEditClick={handleEditClick} handleSaveChanges={handleSaveChanges} />
      {!isEditing && <TrashIcon setShowDeleteConfirmation={setShowDeleteConfirmation} />}
    </div>
  </div>
);

const EditIcon = ({ isEditing, setShowDeleteConfirmation, handleEditClick, handleSaveChanges }) => (
  <div
    className={isEditing ? "venue-edit" : "edit-image"}
    onClick={() => {
      setShowDeleteConfirmation(false);
      isEditing ? handleSaveChanges() : handleEditClick();
    }}
  >
    {isEditing ? <button className="venue-edit-save-changes">Save Changes</button> : <img src={editIcon} alt="edit-icon" />}
  </div>
);

const TrashIcon = ({ setShowDeleteConfirmation }) => (
  <div className="traash-icon-container">
    <img
      src={trashIcon}
      alt="trash icon"
      id="trash-icon"
      onClick={() => {
        setShowDeleteConfirmation(true);
      }}
    />
  </div>
);

const ModalContainer = ({ showDeleteConfirmation, setShowDeleteConfirmation, handleDeleteVenue, isEditing, selectedVenue, handleInputChange }) => (
  <div className="modal-container">
    {showDeleteConfirmation ? <DeleteConfirmation setShowDeleteConfirmation={setShowDeleteConfirmation} handleDeleteVenue={handleDeleteVenue} /> : null}
    {isEditing ? (
      <EditVenueInputs selectedVenue={selectedVenue} handleInputChange={handleInputChange} />
    ) : (
      <VenueDetails showDeleteConfirmation={showDeleteConfirmation} selectedVenue={selectedVenue} />
    )}
  </div>
);

const DeleteConfirmation = ({ setShowDeleteConfirmation, handleDeleteVenue }) => (
  <div className="delete-confirmation-modal">
    <p>U sure?</p>
    <div className="delete-confirmation-btn">
      <button onClick={handleDeleteVenue}>Sí</button>
      <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
    </div>
  </div>
);

const EditVenueInputs = ({ selectedVenue, handleInputChange }) => (
  <div className="edit-input-container1">
    {RenderEditInput("nameofvenue-edit", "Name of venue", "text", "name", selectedVenue.name, handleInputChange, "  Name of the venue")}
    <TwoColumnEditInputs titles={["Addres", "Capacity"]} names={["address", "capacity"]} types={["text", "number"]} values={[selectedVenue.address, selectedVenue.capacity]} handleInputChange={handleInputChange} />
    <TwoColumnEditInputs titles={["State", "City"]} names={["state", "city"]} types={["select", "text"]} values={[selectedVenue.state, selectedVenue.city]} handleInputChange={handleInputChange} />
    <TwoColumnEditInputs titles={["Zip Code", "Owner"]} names={["zipcode", "owner"]} types={["text", "text"]} values={[selectedVenue.zipcode, selectedVenue.owner]} handleInputChange={handleInputChange} />
    {RenderEditInput("nameofvenue-edit", "Description", "text", "description", selectedVenue.description, handleInputChange, "  Description")}
  </div>
);

const TwoColumnEditInputs = ({ titles, names, types, values, handleInputChange }) => (
  <>
    <div className="edit-title-input">
      <p>{titles[0]}</p>
      <p>{titles[1]}</p>
    </div>
    <div className="edit-input-container">
      {types[0] === "select" ? (
        <select name={names[0]} value={values[0]} onChange={handleInputChange}>
          <option value="" disabled>
            Select a state
          </option>
          {US_STATES.map((state, index) => (
            <option key={index} value={state.abbreviation}>
              {state.name} {state.abbreviation}
            </option>
          ))}
        </select>
      ) : (
        RenderEditInput(null, null, types[0], names[0], values[0], handleInputChange, `  ${titles[0]}`)
      )}
      {RenderEditInput(null, null, types[1], names[1], values[1], handleInputChange, `  ${titles[1]}`)}
    </div>
  </>
);

const RenderEditInput = (className, label, type, name, value, handleInputChange, placeholder) => (
  <>
    {label ? <p className={className}>{label}</p> : null}
    <input type={type} name={name} value={value} onChange={handleInputChange} placeholder={placeholder} />
  </>
);

const VenueDetails = ({ showDeleteConfirmation, selectedVenue }) => (
  <div className={showDeleteConfirmation ? 'hide' : 'unhide'}>
    {RenderVenueDetail("Address", selectedVenue.address)}
    {RenderVenueDetail("City", selectedVenue.city)}
    {RenderVenueDetail("State", selectedVenue.state)}
    {RenderVenueDetail("Zip Code", selectedVenue.zipcode)}
    {RenderVenueDetail("Capacity", selectedVenue.capacity)}
    {RenderVenueDetail("Owner", selectedVenue.owner)}
    {RenderVenueDetail("Description", selectedVenue.description)}
  </div>
);

const RenderVenueDetail = (title, value) => (
  <div className="detail">
    <p>{title}:</p>
    <p>{value}</p>
  </div>
);

export default CreateModal;

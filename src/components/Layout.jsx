import React, { useEffect, useState } from "react";
import axios from "axios";
import Compact from "react-color/lib";
import { Github } from "react-color/lib/components/github/Github";

let initialFormData = {
  name: "",
  baseDesign: {
    width: 450,
    height: 200,
    sections: [],
  },
};

const initialSectionFormData = {
  name: "T#",
  status: "Available",
  top: 4,
  bottom: "",
  left: "",
  right: "",
  width: 50,
  height: 50,
  color: "ffffff",
};

const Layout = ({ selectedVenue, fetchVenues }) => {
  const [layouts, setLayouts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [editingLayoutId, setEditingLayoutId] = useState(null);
  const [change, setChange] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [deletingLayoutId, setDeletingLayoutId] = useState(null);
  const [sectionFormData, setSectionFormData] = useState(
    initialSectionFormData
  );
  const [section, setSection] = useState([]);
  const [isEditingSection2, setIsEditingSection] = useState(false);

//   let isEditingSection = !!sectionFormData._id;
  const [legend, setLegendData] = useState(null);

  const handleForm = () => {
    setShowForm((prevState) => !prevState);
    setFormData(initialFormData);
    setEditingLayoutId(null);
  };
  const handleChangeSection = (e) => {
    const { name, value } = e.target;

    setSectionFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSectionForm = () => {
    setShowSectionForm((prevState) => !prevState);
    setIsEditingSection(false); // Use this instead
  };

  const handleSectionClick = (sectionId) => {
    const currentSection = section.find((sec) => sec._id === sectionId);
    setSectionFormData(currentSection);
    setShowSectionForm(true);
    setIsEditingSection(true); // Set to true since you're editing
    setLegendData(currentSection);
  };

  const handleLayoutClick = (layout) => {
    console.log("Line 97 layout:", layout);
    setFormData({
      name: layout.name,
      baseDesign: {
        width: layout.baseDesign.width,
        height: layout.baseDesign.height,
        sections: layout.baseDesign.sections || [],
      },
    });

    getSectionsFromLayout(layout._id);

    setShowForm(true);
    setEditingLayoutId(layout._id);
  };

  let [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "width" || name === "height") {
      setFormData((prevState) => ({
        ...prevState,
        baseDesign: {
          ...prevState.baseDesign,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const getSectionsFromLayout = async (layoutId) => {
    console.log("Line 143 - Selected LayoutId:", layoutId);

    try {
      const response = await axios.get(
        `http://localhost:3000/layout/allsectionsfromlayoutid/${layoutId}`
      );

      console.log("Line 164 - response:", response);
      console.log("Line 165 - response.data:", response.data);

      if (!response.data.success) {
        console.log("There was an error");
      }

      if (response.data.success) {
        setChange(!change);
        setSection(response.data.sections);
        console.log(response.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("There was a problem with the fetch sections:", error);
    }
  };

  const handleSubmitSection = async (e) => {
    // console.log("Line 75 - Submit Section Triggered");
    e.preventDefault();

    try {
      const sectionResponse = await axios.post(
        "http://localhost:3000/layout/section",
        {
          name: sectionFormData.name,
          status: sectionFormData.status,
          top: sectionFormData.top,
          bottom: sectionFormData.bottom,
          left: sectionFormData.left,
          right: sectionFormData.right,
          width: sectionFormData.width,
          height: sectionFormData.height,
          color: sectionFormData.color,
        }
      );

      //   console.log("Line 95 - Section Response:", sectionResponse);
      //   console.log("Line 97 - Section Data:", sectionResponse.data);
      //   console.log("Line 106 - Editing Layout", editingLayoutId);

      //   console.log("Section Id to send:", sectionResponse.data._id);
      if (sectionResponse.data) {
        // console.log("Log before Section Post");

        const assignSectionResponse = await axios.post(
          `http://localhost:3000/layout/addsections/${editingLayoutId}`,
          {
            sections: [sectionResponse.data.data._id],
          }
        );
        // console.log("Log after Section Post");
        // console.log(
        //   "Line 107 - sectionResponse.data._id:",
        //   sectionResponse.data._id
        // );

        // console.log(
        //   "Line 107 - Assign Section Response:",
        //   assignSectionResponse.data
        // );

        if (assignSectionResponse.data.success) {
          alert("Section added and assigned successfully");
          handleSectionForm((prevState) => !prevState);
          fetchVenues();
          setLegendData(null);
          setChange(!change);
          setSectionFormData(initialSectionFormData);
          getSectionsFromLayout(editingLayoutId);
        } else {
          alert(
            assignSectionResponse.data.message ||
              "Error assigning section to layout"
          );
        }
      } else {
        alert(sectionResponse.data.message || "Error creating section");
      }
    } catch (error) {
      console.log("Error handling the section:", error);
    }
  };

  const handleUpdateSection = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/layout/section/edit/${sectionFormData._id}`,
        sectionFormData
      );
      console.log("Line 198 - sectionFormData:", sectionFormData);
      if (response.data) {
        setSection(response.data.sections);
        setShowSectionForm(false);
        getSectionsFromLayout(editingLayoutId);
        setLegendData(null);
        setChange(!change);
      } else {
        alert("Error actualizando la sección");
      }
    } catch (error) {
      console.error("Error al actualizar la sección:", error);
    }
  };

  const deleteSection = async () => {
    try {
      const apiUrl = `http://localhost:3000/layout/section/delete/${sectionFormData._id}`;

      const response = await axios.delete(apiUrl);

      if (response.data) {
        alert("Sección borrada exitosamente");

        setSection(response.data.sections);
        setShowSectionForm(false);
        getSectionsFromLayout(editingLayoutId);
      } else {
        alert("Error actualizando la sección");
      }
    } catch (error) {
      console.error("Error al actualizar la sección:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingLayoutId) {
      try {
        const response = await axios.put(
          `http://localhost:3000/layout/edit/${editingLayoutId}`,
          formData
        );
        if (response.data.success) {
          alert("Layout updated successfully");
          fetchVenues();
          setFormData(initialFormData);
          setEditingLayoutId(null);
          setShowForm(false);
          setChange(!change);
        } else {
          setErrorMessage(response.data.msg || "Error updating layout");
        }
      } catch (error) {
        console.error("Error updating layout:", error);
        setErrorMessage("Error, please try again.");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/layout/create",
          formData
        );

        if (response.data && response.data._id) {
          const newLayoutId = response.data._id;
          const url = `http://localhost:3000/layout/addcreatedlayout/${selectedVenue._id}`;
          const assignResponse = await axios.post(url, {
            layout: [newLayoutId],
          });

          if (assignResponse.data) {
            alert("Layout created and assigned successfully");
            setChange(!change);
            fetchVenues();
          } else {
            console.log("There was a problem assigning the layout");
          }
        } else {
          setErrorMessage(response.data.msg || "Error creating layout");
        }
      } catch (error) {
        console.log("Error creating layout:", error);
        setErrorMessage("Error, please try again.");
      }
      setShowForm(false);
      setFormData(initialFormData);
    }
  };

  const handleDeleteLayout = async () => {
    if (!deletingLayoutId) {
      console.error("Invalid Layout ID");
      setErrorMessage("Error, invalid Layout ID.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/layout/delete/${deletingLayoutId}`
      );
      alert("Layout deleted successfully");
      fetchVenues();
      setConfirmation(false);
      setDeletingLayoutId(null);
      setChange(!change);
    } catch (error) {
      console.log("Error deleting layout:", error);
      setErrorMessage("Error, please try again.");
    }
  };

  useEffect(() => {
    const apiUrl = `http://localhost:3000/layout/specific/${selectedVenue._id}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setLayouts(response.data.layout);
      })
      .catch((err) => {
        console.error("Error fetching layouts", err);
      });
  }, [selectedVenue._id, change]);

  const handleConfirmation = (layoutId) => {
    setDeletingLayoutId(layoutId);
    setConfirmation((prevState) => !prevState);
  };

  return (
    <div>
      <div className="all-layouts-title-container">
        <h2 className="all-layouts-title">All Layouts</h2>
        <div className="layout-plus">
          <div className="layout-plus2" onClick={handleForm}>
            <div className="hrs-cont">
              <hr className={showForm ? "hide" : "hr1"} />
              <hr className={showForm ? "hr3" : "hr2"} />
            </div>
          </div>
        </div>
      </div>
      {confirmation ? (
        <div className="confirmation-prompt">
          <p>¿Estás seguro de que quieres borrar este layout?</p>
          <button onClick={() => handleDeleteLayout(editingLayoutId)}>
            Sí
          </button>
          <button onClick={handleConfirmation}>No</button>
        </div>
      ) : showForm ? (
        <div className="layout-form-container">
          <h2 className="layout-form-title">
            {editingLayoutId ? "Edit Layout" : "Add a new layout"}
          </h2>
          {/* Form #1 Principio*/}
          <form onSubmit={handleSubmit} className="layout-form">
            <div className="layout-form-inner">
              <div>
                <h4>Layout Name</h4>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Layout Name"
                />
              </div>

              <div>
                <h4>Width</h4>
                <input
                  type="number"
                  name="width"
                  value={formData.baseDesign.width}
                  onChange={handleChange}
                  placeholder="Set Width"
                />
              </div>

              <div>
                <h4>Heigth</h4>
                <input
                  type="number"
                  name="height"
                  value={formData.baseDesign.height}
                  onChange={handleChange}
                  placeholder="Set Height"
                />
              </div>
            </div>

            <button type="submit" className="update-btn-layout">
              {editingLayoutId ? "Update" : "Submit"}
            </button>
          </form>
          {/* Form #1  Final*/}

          <div className="dynamic-creation-container">
            <div
              className="dynamic-creation"
              style={{
                width: `${formData.baseDesign.width}px`,
                height: `${formData.baseDesign.height}px`,
                border: "1px solid black",
                position: "relative",
              }}
            >
              {section.map((sec, id) => (
                <div
                  className="sec-name-cont"
                  key={sec._id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    position: "absolute",
                    width: `${sec.width || 0}px`,
                    height: `${sec.height || 0}px`,
                    top: `${sec.top || 0}%`,
                    left: `${sec.left || 0}%`,
                    backgroundColor: `#${sec.color}`,
                    border: "1px solid black",
                  }}
                >
                  {sec.name}
                </div>
              ))}
              <div>
                {showSectionForm && (
                  <div
                    className="sec-name-cont-preview"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                      position: "absolute",
                      width: `${sectionFormData.width || 0}px`,
                      height: `${sectionFormData.height || 0}px`,
                      top: `${sectionFormData.top || 0}%`,
                      left: `${sectionFormData.left || 0}%`,
                      backgroundColor: `#${sectionFormData.color}`,
                      border: "1px solid blue",
                    }}
                  >
                    {sectionFormData.name}
                  </div>
                )}
              </div>
            </div>
            {/* <Github
              id="color-picker"
              //   style={{
              //     width: "10rem",
              //     height: "10rem",
              //   }}
              //   colors={[
              //     "#D9E3F0",
              //     "#F47373",
              //     "#697689",
              //     "#37D67A",
              //     "#2CCCE4",
              //     "#555555",
              //     "#dce775",
              //     "#ff8a65",
              //     "#ba68c8",
              //   ]}
            /> */}
            <div className="add-layout-section">
              {showSectionForm ? (
                // Form #2 Principio
                <form
                  onSubmit={handleSubmitSection}
                  className="add-section-form"
                >
                  <div className="add-section-form1">
                    <p>Section Name</p>
                    <input
                      type="text"
                      name="name"
                      value={sectionFormData.name || ""}
                      onChange={handleChangeSection}
                    />
                    <div className="add-section-form2">
                      <p>X</p>
                      <p>Y</p>
                      <input
                        type="number"
                        name="left"
                        value={sectionFormData.left || ""}
                        onChange={handleChangeSection}
                      />
                      <input
                        type="number"
                        name="top"
                        value={sectionFormData.top || ""}
                        onChange={handleChangeSection}
                      />

                      <p>Status</p>
                      <p>Width</p>

                      <input
                        type="text"
                        name="status"
                        value={sectionFormData.status || ""}
                        onChange={handleChangeSection}
                      />

                      <input
                        type="number"
                        name="width"
                        value={sectionFormData.width || ""}
                        onChange={handleChangeSection}
                      />
                      <p>Height</p>
                      <p>Color</p>
                      <input
                        type="number"
                        name="height"
                        value={sectionFormData.height || ""}
                        onChange={handleChangeSection}
                      />
                      <select
                        name="color"
                        value={sectionFormData.color || ""}
                        onChange={handleChangeSection}
                      >
                        <option value="ffffff">None</option>
                        <option value="D9E3F0">Light Blue</option>
                        <option value="F47373">Light Red</option>
                        <option value="697689">Blue</option>
                        <option value="37D67A">Green</option>
                        <option value="2CCCE4">Aqua</option>
                        <option value="dce775">Yellow</option>
                        <option value="ff8a65">Orange</option>
                        <option value="ba68c8">Purple</option>
                        <option value="111111">Black</option>
                      </select>
                    </div>
                  </div>
                  <hr />
                  <div className="add-delete-section">
                    <button
                      type="submit"
                      className={showSectionForm ? "" : "hidden"}
                      onClick={
                        isEditingSection2
                          ? handleUpdateSection
                          : handleSubmitSection
                      }
                    >
                      {isEditingSection2 ? "Update" : "Add"}
                    </button>
                    <button type="button" onClick={deleteSection}>
                      Delete
                    </button>
                  </div>
                </form>
              ) : (
                //   Form #2 Final
                <div>
                  <button
                    className={
                      formData.baseDesign.width > 149 &&
                      formData.baseDesign.height > 149
                        ? "add-section-btn"
                        : "hide"
                    }
                    onClick={handleSectionForm}
                  >
                    Add Section
                  </button>
                  <hr />
                  <h4 className="created-sections">Created Sections:</h4>
                  <div className="sec-container">
                    {section.map((sec) => (
                      <div className="sec-name-cont" key={sec._id}>
                        <p
                          className="sec-name"
                          onClick={() => handleSectionClick(sec._id)}
                        >
                          {sec.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {layouts.map((layout) => (
            <div key={layout._id} className="layouts-container2">
              <div
                className="layout-name"
                onClick={() => handleLayoutClick(layout)}
              >
                {layout.name}
              </div>
              <div className="layout-inside-icons">
                <button onClick={() => handleConfirmation(layout._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={isEditingSection2 ? "legend-container" : "hide"}>
        <h2>Legend</h2>
        <h4>
          Create Seats For Section:
          {isEditingSection2 ? <span>{legend.name}</span> : <span></span>}
        </h4>
      </div>
    </div>
  );
};

export default Layout;

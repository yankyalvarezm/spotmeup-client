import React, { useEffect, useState } from "react";
import axios from "axios";

let initialFormData = {
  name: "",
  baseDesign: {
    width: "",
    height: "",
    sections: [],
  },
};

const initialSectionFormData = {
  name: "",
  status: "",
  top: "",
  bottom: "",
  left: "",
  right: "",
  width: "",
  height: "",
  color: "",
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
        setSection(response.data.sections);
        setChange(!change);
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
          name: e.target.name.value,
          status: e.target.status.value,
          top: e.target.top.value,
          bottom: e.target.bottom.value,
          left: e.target.left.value,
          right: e.target.right.value,
          width: e.target.width.value,
          height: e.target.height.value,
          color: e.target.color.value,
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
              }}
            >
              Preview
            </div>
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
                      value={sectionFormData.name}
                      onChange={handleChangeSection}
                    />
                    <div className="add-section-form2">
                      <p>Status</p>
                      <p>Top</p>
                      <input
                        type="text"
                        name="status"
                        value={sectionFormData.status}
                        onChange={handleChangeSection}
                      />
                      <input
                        type="number"
                        name="top"
                        value={sectionFormData.top}
                        onChange={handleChangeSection}
                      />
                      <p>Bottom</p>
                      <p>Left</p>
                      <input
                        type="number"
                        name="bottom"
                        value={sectionFormData.bottom}
                        onChange={handleChangeSection}
                      />
                      <input
                        type="number"
                        name="left"
                        value={sectionFormData.left}
                        onChange={handleChangeSection}
                      />
                      <p>Right</p>
                      <p>Width</p>
                      <input
                        type="number"
                        name="right"
                        value={sectionFormData.right}
                        onChange={handleChangeSection}
                      />
                      <input
                        type="number"
                        name="width"
                        value={sectionFormData.width}
                        onChange={handleChangeSection}
                      />
                      <p>Height</p>
                      <p>Color</p>
                      <input
                        type="number"
                        name="height"
                        value={sectionFormData.height}
                        onChange={handleChangeSection}
                      />
                      <input
                        type="number"
                        name="color"
                        value={sectionFormData.color}
                        onChange={handleChangeSection}
                      />
                    </div>
                  </div>
                  <hr />
                  <button
                    type="submit"
                    className={showSectionForm ? "" : "hidden"}
                  >
                    Add
                  </button>
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
                      <p className="sec-name">{sec.name}</p>
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
    </div>
  );
};

export default Layout;

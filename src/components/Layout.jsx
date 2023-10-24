import React, { useEffect, useState } from "react";
import axios from "axios";
import editIcon from "../../public/images/edit-icon.png";
import CreateModal from "./CreateModal";
import { Link } from "react-router-dom";

const Layout = ({ selectedVenue, fetchVenues, refresh }) => {
  const [layouts, setLayouts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingLayoutId, setEditingLayoutId] = useState(null);
  const [change, setChange] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const initialFormData = {
    name: "",
    width: 0,
    height: 0,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [originalData, setOriginalData] = useState(initialFormData);

  const handleForm = () => {
    setShowForm((prevState) => !prevState);
    setFormData(initialFormData);
    setEditingLayoutId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          setShouldRefresh(!shouldRefresh);
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

  const handleLayoutClick = (layout) => {
    localStorage.setItem("layoutName", layout.name);
    localStorage.setItem("layoutWidth", layout.width || 0); // Asegúrate de guardar una cadena vacía si no hay valor
    localStorage.setItem("layoutHeight", layout.height || 0); // Asegúrate de guardar una cadena vacía si no hay valor

    setFormData({
      name: layout.name,
      width: layout.width || 0,
      height: layout.height || 0,
    });
    setShowForm(true);
    setEditingLayoutId(layout._id);
  };

  useEffect(() => {
    const apiUrl = `http://localhost:3000/layout/specific/${selectedVenue._id}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setLayouts(response.data.layout);

        const storedName = localStorage.getItem("layoutName") || "";
        const storedWidth = localStorage.getItem("layoutWidth") || "";
        const storedHeight = localStorage.getItem("layoutHeight") || "";

        setFormData({
          name: storedName,
          width: storedWidth,
          height: storedHeight,
        });
      })
      .catch((err) => {
        console.error("Error fetching layouts", err);
      });
  }, [selectedVenue._id, change, shouldRefresh]);

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
      <div className="layouts-container">
        {showForm ? (
          <div className="layout-form-container">
            <h2 className="layout-form-title">
              {editingLayoutId ? "Edit Layout" : "Add a new layout"}
            </h2>
            <form onSubmit={handleSubmit} className="layout-form">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Layout Name"
                />
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  placeholder="Set Width"
                />
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Set Height"
                />
              </div>
              <button type="submit">
                {editingLayoutId ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        ) : (
          <div>
            {layouts.map((layout) => (
              <div
                key={layout._id}
                className="layouts-container2"
                onClick={() => handleLayoutClick(layout)}
              >
                <div className="layout-name">{layout.name}</div>
                <div className="layout-inside-icons"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;

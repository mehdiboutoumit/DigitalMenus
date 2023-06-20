import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CreateTable = ({ editTableData, restaurantId, onCloseModal }) => {
  const [menus, setMenus] = useState([]);
  const [selectedMenus, setSelectedMenus] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/menus/restaurant/${restaurantId}`);
      setMenus(response.data.menus);
      console.log(response.data.menus);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [num, setNum] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (editTableData) {
      // Fill the form fields with the old information
      setNum(editTableData.numTable || "");
      setSize(editTableData.size || "");
      setSelectedMenus(editTableData.selectedMenus || []);
    } else {
      // Reset the form fields
      setNum("");
      setSize("");
      setSelectedMenus([]);
    }
  }, [editTableData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editTableData) {
      try {
        const response = await axios.put(`http://localhost:5000/api/table/update/${editTableData.id}`, {
          size: size,
          numTable: num,
          id_menus: JSON.stringify(selectedMenus),
          id_restaurant: restaurantId,
        });
        console.log("Table updated successfully");
        fetchData();
        // Handle success, e.g., show a success message or redirect to another page
      } catch (error) {
        console.error("Error updating table:", error);
        // Handle error, e.g., show an error message
      }
    } else {
      const id = uuidv4();

      try {
        const response = await axios.post("http://localhost:5000/api/table/add", {
          id: id,
          size: size,
          numTable: num,
          id_menus: JSON.stringify(selectedMenus),
          id_restaurant: restaurantId,
        });
        console.log("Table saved successfully");
        fetchData();
        // Handle success, e.g., show a success message or redirect to another page
      } catch (error) {
        console.error("Error saving table:", error);
        // Handle error, e.g., show an error message
      }

      // Handle form submission
      console.log("Submit", { num, size, selectedMenus });
    }

    onCloseModal();
  };

  const handleMenuChange = (e, menuId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedMenus((prevSelectedMenus) => [...prevSelectedMenus, menuId]);
    } else {
      setSelectedMenus((prevSelectedMenus) => prevSelectedMenus.filter((menu) => menu !== menuId));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="num">Numero de la table</label>
        <input
          type="number"
          className="form-control"
          id="num"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="size">Nombre de personnes</label>
        <input
          type="number"
          className="form-control"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Menus</label>
        {menus.map((menu) => (
          <div key={menu.id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`menu-${menu.id}`}
              value={menu.name}
              checked={selectedMenus.includes(menu.id)}
              onChange={(e) => handleMenuChange(e, menu.id)}
            />
            <label className="form-check-label" htmlFor={`menu-${menu.id}`}>
              <div className="d-flex align-items-center">
                <img
                  src={`http://localhost:5000/images/${menu.image}`}
                  alt={menu.name}
                  className="menu-image"
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <span className="menu-name">{menu.name}</span>
              </div>
            </label>
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-outline-primary">
        {editTableData ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
};

export default CreateTable;

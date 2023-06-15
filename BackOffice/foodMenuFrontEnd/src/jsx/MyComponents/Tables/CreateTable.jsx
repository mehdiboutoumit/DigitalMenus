import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CreateTable = ({ editTableData, restaurantId, onCloseModal }) => {
  const [menus, setMenus] = useState([]);

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
  const [menu, setMenu] = useState("");

  useEffect(() => {
    if (editTableData) {
      // Fill the form fields with the old information
      setNum(editTableData.numTable || "");
      setSize(editTableData.size || "");
      setMenu(editTableData.menu || "");
    } else {
      // Reset the form fields
      setNum("");
      setSize("");
      setMenu("");
    }
  }, [editTableData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(editTableData){
      try {
        const response = await axios.put(`http://localhost:5000/api/table/update/${editTableData.id}`, {
          size: size,
          numTable: num,
          id_restaurant: restaurantId,
        });
        console.log("Table updated successfully");
        fetchData();
        // Handle success, e.g., show a success message or redirect to another page
      } catch (error) {
        console.error("Error updating table:", error);
        // Handle error, e.g., show an error message
      }
    }

    else
    {const id = uuidv4();

    try {
      const response = await axios.post("http://localhost:5000/api/table/add", {
        id: id,
        size: size,
        numTable: num,
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
    console.log("Submit", { num, size, menu });}
    onCloseModal();
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
        <label htmlFor="menu">Menu</label>
        <select
          className="form-control"
          id="menu"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
        >
          <option value="">Selectionner un menu</option>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.name}>
              {menu.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-outline-primary">
        {editTableData ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
};

export default CreateTable;

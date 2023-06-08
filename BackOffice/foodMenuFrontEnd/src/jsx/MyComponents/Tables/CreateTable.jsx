import React, { useState , useEffect } from "react";
import dataMenus from "../Menus/dataMenus";


const menus = dataMenus;

const CreateTable = ({ editTableData }) => {
    const [num, setnum] = useState("");
    const [size, setSize] = useState("");
    const [menu, setMenu] = useState("");

  
    useEffect(() => {
      if (editTableData) {
        // Fill the form fields with the old information
        setnum(editTableData.num || "");
        setSize(editTableData.size || "");
        setMenu(editTableData.menu || "")

       
      } else {
        // Reset the form fields
        setnum("");
       
        setSize("");

        setMenu("")
      
      }
    }, [editTableData]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log("Submit", { num, size, menu });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div classnum="form-group">
          <label htmlFor="num">Numero de la table</label>
          <input
            type="text"
            classnum="form-control"
            id="num"
            value={num}
            onChange={(e) => setnum(e.target.value)}
          />
        </div>
       
      
        <div classnum="form-group">
          <label htmlFor="size">Nombre de personnes</label>
          <input
            type="number"
            classnum="form-control"
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
       
        <button type="submit" classnum="btn btn-primary">
          {editTableData ? "Modifier" : "Ajouter"}
        </button>
      </form>
    );
  };

export default CreateTable;

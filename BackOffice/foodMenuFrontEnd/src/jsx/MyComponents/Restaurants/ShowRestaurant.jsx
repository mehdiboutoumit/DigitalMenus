import React from "react";
import { MDBDataTable } from "mdbreact";
import {Link} from "react-router-dom";
import Menus from "../Menus/Menus";
import Tables from "../Tables/Tables";

const RestaurantView = () => {
  const tables = [
    { id: 1, name: "Table 1", capacity: 4 },
    { id: 2, name: "Table 2", capacity: 6 },
    { id: 3, name: "Table 3", capacity: 2 },
    // ... other tables
  ];

  const menus = [
    { id: 1, name: "Appetizers", categories: ["Salad", "Soup", "Bruschetta"] },
    { id: 2, name: "Main Courses", categories: ["Steak", "Pasta", "Fish"] },
    { id: 3, name: "Desserts", categories: ["Cake", "Ice Cream", "Fruit Salad"] },
    // ... other menus
  ];

  const tableData = {
    columns: [
      { label: "ID", field: "id" },
      { label: "Name", field: "name" },
      { label: "Capacity", field: "capacity" },
      { label: "", field: "actions" },

    ],
    rows: tables.map((table) => ({
      id: table.id,
      name: table.name,
      capacity: table.capacity,
      actions : ( <div>
        <Link to="/Tables">
        <i className='flaticon-381-view-2 btn btn-warning'></i>
      </Link>
      </div>)
    })), 
    
  };

  const menuData = {
    columns: [
      { label: "ID", field: "id" },
      { label: "Name", field: "name" },
      { label: "categories", field: "categories" },
      { label: "", field: "actions" },


    ],
    rows: menus.map((menu) => ({
      id: menu.id,
      name: menu.name,
      categories: menu.categories.join(", "),
      actions : ( <div>
        <Link to="/ShowMenu">
        <i className='flaticon-381-view-2 btn btn-warning'></i>
      </Link>
      </div>)
    })),
  };

  return (
    <div className="restaurant-view">
      <div className="tables">
        <h2>Tables</h2>
        <Tables />
      </div>
      <hr></hr>
      <div className="menus">
        <h2>Menus</h2>
        <Menus />
      </div>
    </div>
  );
};

export default RestaurantView;

import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom";
import Menus from "../Menus/Menus";
import Tables from "../Tables/Tables";
import Collaborators from "../Collaborators/Collaborators";
import axios from "axios";

const RestaurantView = () => {

  const {restaurantId} = useParams();
  const [restauName, setRestauName] = useState("");
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/restaurant/${restaurantId}`);
      const restau = response.data.restaurant;
      setRestauName(restau.name);
      console.log(response)

    } catch (error) {
      console.error('Error fetching restau:', error);
    }
  };

  useEffect(() => {

    fetchData();
  }, [] );

  // const tables = [
  //   { id: 1, name: "Table 1", capacity: 4 },
  //   { id: 2, name: "Table 2", capacity: 6 },
  //   { id: 3, name: "Table 3", capacity: 2 },
  //   // ... other tables
  // ];

  // const menus = [
  //   { id: 1, name: "Appetizers", categories: ["Salad", "Soup", "Bruschetta"] },
  //   { id: 2, name: "Main Courses", categories: ["Steak", "Pasta", "Fish"] },
  //   { id: 3, name: "Desserts", categories: ["Cake", "Ice Cream", "Fruit Salad"] },
  //   // ... other menus
  // ];

  // const tableData = {
  //   columns: [
  //     { label: "ID", field: "id" },
  //     { label: "Name", field: "name" },
  //     { label: "Capacity", field: "capacity" },
  //     { label: "", field: "actions" },

  //   ],
  //   rows: tables.map((table) => ({
  //     id: table.id,
  //     name: table.name,
  //     capacity: table.capacity,
  //     actions : ( <div>
  //       <Link to="/Tables">
  //       <i className='flaticon-381-view-2 btn btn-warning'></i>
  //     </Link>
  //     </div>)
  //   })), 
    
  // };

  // const menuData = {
  //   columns: [
  //     { label: "ID", field: "id" },
  //     { label: "Name", field: "name" },
  //     { label: "categories", field: "categories" },
  //     { label: "", field: "actions" },


  //   ],
  //   rows: menus.map((menu) => ({
  //     id: menu.id,
  //     name: menu.name,
  //     categories: menu.categories.join(", "),
  //     actions : ( <div>
  //       <Link to="/ShowMenu">
  //       <i className='flaticon-381-view-2 btn btn-warning'></i>
  //     </Link>
  //     </div>)
  //   })),
  // };

  return (
    <div className="restaurant-view text-center">
      <h3 className="text-center mb-4">
        Bienvenue dans{" "}
        <span className="text-primary">
          <h1 style={{ fontSize: "60px", fontWeight: "bold", fontFamily: "Rockwell Extra Bold" }}>{restauName}</h1>
        </span>
      </h3>
      <div className="justify-content-center border border-2  rounded p-5">
      <h2 className="text-center text-uppercase mb-4">
        <span className="bg-primary px-4 py-2 rounded text-white">
          Tables
        </span>
      </h2>
        <Tables restaurantId={restaurantId} />
      </div>
    
      <div className="justify-content-between border border-2  rounded p-5">
      <h2 className="text-center text-uppercase mb-4">
        <span className="bg-primary px-4 py-2 rounded text-white">
          Menus
        </span>
      </h2>
        <Menus restaurantId={restaurantId}  />
      </div>
   
      <div className="justify-content-between border border-2  rounded p-5">
      <h2 className="text-center text-uppercase mb-4">
        <span className="bg-primary px-4 py-2 rounded text-white">
          Collaborateurs
        </span>
      </h2>
        <Collaborators restaurantId={restaurantId}  />
      </div>
    </div>
  );
};

export default RestaurantView;

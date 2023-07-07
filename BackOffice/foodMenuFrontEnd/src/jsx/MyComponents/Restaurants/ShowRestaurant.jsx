import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom";
import Menus from "../Menus/Menus";
import Tables from "../Tables/Tables";
import Collaborators from "../Collaborators/Collaborators";
import axios from "axios";
import { Nav, Tab } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import swal from "sweetalert";

const RestaurantView = () => {

  const {restaurantId} = useParams();
  const [restauName, setRestauName] = useState("");
  const history = useHistory();
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/restaurant/${restaurantId}`);
      const restau = response.data.restaurant;
      setRestauName(restau.name);
    

    } catch (error) {
      // if (error.response?.status === 401) {
      //   history.push('/login');
      // } else {
      //   history.push('/error500');
      // }
      swal("Erreur")
      console.error('Error fetching restau:', error);
    }
  };

  useEffect(() => {

    fetchData();
  }, [] );

  

  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="restaurant-view text-center">
      <h3 className="text-center mb-4">
        Bienvenue dans{" "}
        <span className="text-primary">
          <h1 style={{ fontSize: "60px", fontWeight: "bold", fontFamily: "Rockwell Extra Bold" }}>{restauName}</h1>
        </span>
      </h3>
      <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
        <Nav variant="tabs" className="nav-pills mb-4">
          <Nav.Item>
            <Nav.Link eventKey="tab1">Tables</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab2">Menus</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab3">Collaborateurs</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="tab1">
                <div className="justify-content-center border border-2  rounded p-5">
            <h2 className="text-center text-uppercase mb-4">
              <span className="bg-primary px-4 py-2 rounded text-white">
                Tables
              </span>
            </h2>
              <Tables restaurantId={restaurantId} />
            </div>
    
          </Tab.Pane>
          <Tab.Pane eventKey="tab2">
          <div className="justify-content-between border border-2  rounded p-5">
      <h2 className="text-center text-uppercase mb-4">
        <span className="bg-primary px-4 py-2 rounded text-white">
          Menus
        </span>
      </h2>
        <Menus restaurantId={restaurantId}  />
      </div>
            </Tab.Pane>
            <Tab.Pane eventKey="tab3">
            <div className="justify-content-between border border-2  rounded p-5">
      <h2 className="text-center text-uppercase mb-4">
        <span className="bg-primary px-4 py-2 rounded text-white">
          Collaborateurs
        </span>
      </h2>
        <Collaborators restaurantId={restaurantId}  />
      </div>
            
            </Tab.Pane>
      </Tab.Content>
      </Tab.Container>
      
     
   
      
    </div>
  );
};

export default RestaurantView;

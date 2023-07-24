import React, { Fragment, useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie'
import { MDBDataTable } from "mdbreact";
import { Dropdown, Button, Modal, Badge, Tab, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import EditOrder from './EditOrder';
import {baseURL} from '../../../api/baseURL';
import axios from "axios";
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import { Box } from "@material-ui/core";

const Orders = () => {
  const {auth} = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editOrderData, setEditOrderData] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] =useState(null);
  const [isFetchingOrders, setIsFetchingOrders] = useState(false);
  const [refetch, setRefetch] = useState('')



  useEffect(() => {
    document.title = "Commandes"
   
    // Fetch restaurants from the server and update the state
    const fetchRestaurants = async () => {
      try {
        if(Cookies.get('accessType') === "superadmin"){
            const response = await axios.get(`${baseURL}/restaurant`, {
              headers: {
                authorization: `Bearer ${Cookies.get('accessToken')}`,
                id : `Bearer ${Cookies.get('userId')}`
              },
            });
            const data = response.data.restaurants;
            setRestaurants(data); 
            
      }
      else{
        if (Cookies.get('accessType') === "admin"){
          const response = await axios.get(`${baseURL}/restaurant/admin/${Cookies.get('userId')}`, {
            headers: {
              authorization: `Bearer ${Cookies.get('accessToken')}`,
              id : `Bearer ${Cookies.get('userId')}`
            },
          });
          const data = response.data.restaurants;
          setRestaurants(data); 
        }
        else{
          const res = await axios.get(`${baseURL}/user/one/${Cookies.get('userId')}`, {
            headers: {
              authorization: `Bearer ${Cookies.get('accessToken')}`,
              id : `Bearer ${Cookies.get('userId')}`
            },
          });
          
          const restaurantId = res.data.user.id_restaurant ;
          const response = await axios.get(`${baseURL}/restaurant/${restaurantId}`, {
            headers: {
              authorization: `Bearer ${Cookies.get('accessToken')}`,
              id : `Bearer ${Cookies.get('userId')}`
            },
          });
          const restau = response.data.restaurant;
          setSelectedRestaurant(restau) 
        }
      }
     
      } catch (error) {
        console.log(error);
      }
    };

    fetchRestaurants();
    return () => {
      // Cancel any ongoing fetch orders operation
      document.title = "Digi Restau"
      setIsFetchingOrders(false);
    };
  }, []);
  useEffect(() => {
    // Fetch orders from the server and update the state
    setIsFetchingOrders(true);
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseURL}/order/restaurant/${selectedRestaurant.id}`, {
          headers: {
            authorization: `Bearer ${Cookies.get('accessToken')}`,
            id : `Bearer ${Cookies.get('userId')}`
          },
        });
        const data = response.data.orders;
         setOrders(data);
      } catch (error) {
        console.log(error);
      }
      setIsFetchingOrders(false);
    };
   

    if (selectedRestaurant) {
      fetchOrders();
    }
  }, [selectedRestaurant, refetch]);

  const handleRestaurantChange = (selectedOption) => {
    setSelectedRestaurant(selectedOption.value);
  };

  const handleComplete = async(row) => {
    try {
      const res = await axios.put(`${baseURL}/order/finish/${row.id}`)
      console.log("Finish",res);
      const response = await axios.get(`${baseURL}/order/restaurant/${selectedRestaurant.id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get('accessToken')}`,
          id : `Bearer ${Cookies.get('userId')}`
        },
      });
      const data = response.data.orders;
       setOrders(data);
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleStart =async (row) => {
    try {
      const res = await axios.put(`${baseURL}/order/start/${row.id}`)
      console.log("Start",res);
      const response = await axios.get(`${baseURL}/order/restaurant/${selectedRestaurant.id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get('accessToken')}`,
          id : `Bearer ${Cookies.get('userId')}`
        },
      });
      const data = response.data.orders;
       setOrders(data);
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleDelete = (rowData) => {
    // Handle delete action
    console.log("Delete", rowData);
  };

  const handleShowCreateModal = () => {
    // Reset the editOrderData state when showing the create modal
    setEditOrderData(null);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const dataNew = {
    columns: [
      { label: "Table", field: "table", sort: "asc" },
      { label: "Date", field: "date", sort: "asc" },
      { label: "Prix total", field: "totalprice", sort: "asc" },
      { label: "Actions", field: "actions" }
    ],
    rows: orders.filter((order) => order.state === 0).map((order) => ({
      id: order.id,
      table: order.id_table,
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      totalprice: order.totalprice,
      actions: (
        <>
              <Button><Link to={`/ShowOrder/${order.id}`}>Details</Link></Button>
             {/* <span> {(!Cookies.get('id_role') === 1) && <Button variant="info" onClick={() => handleStart(order)}><i className="flaticon-381-clock"></i></Button> }</span>
             <span> {(!Cookies.get('id_role') === 1)  && <Button variant="danger" onClick={() => handleDelete(order)}><i className="flaticon-381-multiply-1"></i></Button>} </span> */}
             <span> {<Button variant="info" onClick={() => handleStart(order)}><i className="flaticon-381-clock"></i></Button> }</span>
             <span> { <Button variant="danger" onClick={() => handleDelete(order)}><i className="flaticon-381-multiply-1"></i></Button>} </span>
 
        </>
      ),
    })),
  };

  const dataPending = {
    columns: [
      { label: "Table", field: "table", sort: "asc" },
      { label: "Date", field: "date", sort: "asc" },
      { label: "Prix total", field: "totalprice", sort: "asc" },
      { label: "Actions", field: "actions" }
    ],
    rows: orders.filter((order) => order.state === 1).map((order) => ({
      id: order.id,
      table: order.id_table,
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      totalprice: order.totalprice,
      actions: (
        <>
          <Button><Link to={`/ShowOrder/${order.id}`}>Details</Link></Button>
         
          {/* <span> {(!(Cookies.get('id_role') === 1)) && Cookies.get('accessType') === "user"  && <Button variant="success" onClick={() => handleComplete(order)}><i className="flaticon-381-success"></i></Button> }</span>
             <span> {(!(Cookies.get('id_role') === 1)) && Cookies.get('accessType') === "user"  && <Button variant="danger" onClick={() => handleDelete(order)}><i className="flaticon-381-multiply-1"></i></Button>} </span> */}
             <span> {<Button variant="success" onClick={() => handleComplete(order)}><i className="flaticon-381-success"></i></Button> }</span>
             <span> { <Button variant="danger" onClick={() => handleDelete(order)}><i className="flaticon-381-multiply-1"></i></Button>} </span>
 
        </>
      ),
    })),
  };

  const dataFinish = {
    columns: [
      { label: "Table", field: "table", sort: "asc" },
      { label: "Date", field: "date", sort: "asc" },
      { label: "Prix total", field: "totalprice", sort: "asc" },
      { label: "Actions", field: "actions" }
    ],
    rows: orders.filter((order) => order.state === 2).map((order) => ({
      id: order.id,
      table: order.id_table,
      date: new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      totalprice: order.totalprice,
      actions: (
        <>
          <Button><Link to={`/ShowOrder/${order.id}`}>Details</Link></Button>
          <span> {(!(Cookies.get('id_role') === 1)) && Cookies.get('accessType') === "user"  && <Button variant="danger" onClick={() => handleDelete(order)}><i className="flaticon-381-multiply-1"></i></Button>} </span>
           
    
        </>
      ),
    })),
  };

  const customOption = ({ innerProps, label, data }) => (
    <div {...innerProps}>
      <img src={`http://localhost:5000/images/${data.image}`} alt="image" style={{ marginRight: "10px", width: "80px", height: "80px" }} />
      {label}
    </div>
  );

  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Fragment>
      <h1 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Les commandes</h1>
      <hr></hr>

     {!(Cookies.get('id_role') === 2) &&  <div>
      <Select
        options={restaurants.map((restaurant) => ({
          value: restaurant,
          label: restaurant.name,
          image : restaurant.image
        }))}
        onChange={handleRestaurantChange}
        placeholder="Selectionner un restaurant"
        components = {{Option : customOption}}
      />
   </div>}
   {selectedRestaurant && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px", border: "1px solid orange",borderRadius: "20%"}}>
        <img src={`http://localhost:5000/images/${selectedRestaurant.image}`} alt={selectedRestaurant.name} style={{  width: "100px", height: "100px" }} />
        <span>{selectedRestaurant.name}</span>
      </div>
      )}
    <hr></hr>

      <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
      <Nav variant="tabs" className="nav-pills mb-4">
        <Nav.Item>
          <Nav.Link eventKey="tab1">Nouveaux</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab2">En cours de préparation</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab3">Complètes</Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="tab1">
      <Box>

      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            
            <div className="display mb-4 dataTablesCard">
              <MDBDataTable striped small noBottomColumns hover align="middle" data={dataNew} />
            </div>
          </div>
        </div>
        </div>
        </Box>
        </Tab.Pane>
        <Tab.Pane eventKey="tab2">
        <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            
            <div className="display mb-4 dataTablesCard">
              <MDBDataTable striped small noBottomColumns hover align="middle" data={dataPending} />
            </div>
          </div>
        </div>
        </div>
        </Tab.Pane>
        <Tab.Pane eventKey="tab3">
        <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            
            <div className="display mb-4 dataTablesCard">
              <MDBDataTable striped small noBottomColumns hover align="middle" data={dataFinish} />
            </div>
          </div>
        </div>
        </div>
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>


    {/* <div className="d-flex justify-content-end mb-3">
             <Button variant="primary" onClick={handleShowCreateModal}>
                Ajouter une commande
              </Button> 
              <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {editOrderData ? "Modifier la commande" : "Ajouter une commande"}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                  <EditOrder editOrderData={editOrderData} />
                </Modal.Body>
              </Modal>
            </div> */}
      
    </Fragment>
  );
};

export default Orders;

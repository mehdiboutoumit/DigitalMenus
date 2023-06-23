import React, { Fragment, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Dropdown, Button, Modal, Badge } from "react-bootstrap";
import { Link } from 'react-router-dom';
import EditOrder from './EditOrder';
import {baseURL} from '../../../api/baseURL';
import axios from "axios";
import Select from 'react-select';
import { useHistory } from "react-router-dom";

const Orders = () => {
  const history = useHistory()
  const [orders, setOrders] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editOrderData, setEditOrderData] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] =useState(null);
  const [isFetchingOrders, setIsFetchingOrders] = useState(false);



  useEffect(() => {
   
    // Fetch restaurants from the server and update the state
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${baseURL}/restaurant`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data.restaurants;
        setRestaurants(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRestaurants();
    return () => {
      // Cancel any ongoing fetch orders operation
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
            authorization: `Bearer ${accessToken}`,
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
  }, [selectedRestaurant]);

  const handleRestaurantChange = (selectedOption) => {
    setSelectedRestaurant(selectedOption.value);
  };

  const handleEdit = (rowData) => {
    // Set the order data to editOrderData state
    setEditOrderData(rowData);
    // Show the create modal
    setShowCreateModal(true);
  };

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

  const data = {
    columns: [
      { label: "id", field: "id", sort: "asc" },
      { label: "Table", field: "table", sort: "asc" },
      { label: "Status", field: "status", sort: "asc" },
      { label: "Date", field: "date", sort: "asc" },
      { label: "Prix total", field: "totalprice", sort: "asc" },
      { label: "Actions", field: "actions" }
    ],
    rows: orders.map((order) => ({
      id: order.id,
      table: order.id_table,
      status: (
        <span
          style={{
            color: "white",
            padding: "10px",
            width: "90px",
            backgroundColor:
              order.status === "Nouvelle" ? "blue" :
              order.status === "Prêt" ? "red" :
              order.status === "En Préparation" ? "orange" :
              "limegreen",
            borderRadius: "10%",
            borderWidth: "1px"
          }}
        >
          {order.status}
        </span>
      ),
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
          <Dropdown>
            <Dropdown.Toggle variant="info" id="actions-dropdown"></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleEdit(order)}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDelete(order)}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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

  return (
    <Fragment>
      <h1 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>Les commandes</h1>
      <hr></hr>
       <div>
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
   {selectedRestaurant && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px", border: "1px solid orange",borderRadius: "20%"}}>
        <img src={`http://localhost:5000/images/${selectedRestaurant.image}`} alt={selectedRestaurant.name} style={{  width: "100px", height: "100px" }} />
        <span>{selectedRestaurant.name}</span>
      </div>
      )}
    </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            <div className="d-flex justify-content-end mb-3">
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
                  {/* Pass the editOrderData as a prop to the EditOrder component */}
                  <EditOrder editOrderData={editOrderData} />
                </Modal.Body>
              </Modal>
            </div>
            <div className="display mb-4 dataTablesCard">
              <MDBDataTable striped small noBottomColumns hover align="middle" data={data} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Orders;

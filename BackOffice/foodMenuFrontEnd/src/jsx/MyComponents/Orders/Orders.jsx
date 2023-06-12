import React, { Fragment, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Dropdown, Button, Modal, Badge } from "react-bootstrap";
import dataOrders from "./dataOrders";
import EditOrder from "./EditOrder.jsx";

const Orders = () => {
  const rows = dataOrders;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editOrderData, setEditOrderData] = useState(null);

  const data = {
    columns: [
      { label: "id", field: "id", sort: "asc" },
      { label: "Table", field: "table", sort: "asc" },
      { label: "Status", field: "status", sort: "asc" },
      { label: "Date", field: "date", sort: "asc" },
      { label: "Prix total", field: "totalprice", sort: "asc" },
      { label: "Actions", field: "actions" }
    ],
    rows: rows.map((row) => ({
      ...row,
      actions: (
        <Dropdown>
          <Dropdown.Toggle variant="info" id="actions-dropdown"></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleEdit(row)}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      status: (
        
            
        <span
        style={{
            color : "white",padding : "10px",width : "90px",
          backgroundColor:
            row.status === "Nouvelle" ? "blue" :
            row.status === "Prêt" ? "red" :
            row.status === "En Préparation" ? "orange" :
            "limegreen", borderRadius : "10%", borderWidth :"1px"
        }}
      >
        {row.status}
      </span>
       
      ),
    })),
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

  return (
    <Fragment>
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

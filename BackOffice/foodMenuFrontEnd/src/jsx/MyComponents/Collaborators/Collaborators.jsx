import React, { Fragment, useState, useEffect, useContext } from "react";
import { MDBDataTable } from "mdbreact";
//import dataCollab from "./dataCollab.jsx";
import { Dropdown, Button, Modal } from "react-bootstrap";
import axios from "axios";
import CreateCollab from "./createCollab";
import AuthContext from "../../../context/AuthProvider";
import { useHistory } from "react-router-dom";

const Collaborators = (restaurantId) => {
  // const rows = dataCollab;
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  const{ accessToken } = auth;
  const [dataCollab, setDataCollab] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editCollabData, setEditCollabData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/restaurant/${restaurantId.restaurantId}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const users = response.data.users;
      for (const user of users) {
        user.role = user.role.role;
      }

      setDataCollab(users);
      //console.log(users);
    } catch (error) {
      if (error.response?.status === 401) {
        history.push('/login');
      } else {
        history.push('/error500');
      }
      console.error('Error fetching menus:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, [] );
  const rows = dataCollab;

  const data = {
    columns: [
      { label: "Nom", field: "name", sort: "asc" },
      { label: "Email", field: "email", sort: "asc" },
      { label: "Role", field: "role", sort: "asc" },
      { label: "Actions", field: "actions" },
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
    })),
  };

  const handleEdit = (rowData) => {
    // Set the collaborator data to editCollabData state
    setEditCollabData(rowData);
    // Show the create modal
    setShowCreateModal(true);
  };

  const handleDelete = (rowData) => {
    // Handle delete action
    console.log("Delete", rowData);
  };

  const handleShowCreateModal = () => {
    // Reset the editCollabData state when showing the create modal
    setEditCollabData(null);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    try {
      fetchData();
    } catch (error) {
      
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={handleShowCreateModal}>
              Ajouter un collaborateur
            </Button>

            <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {editCollabData ? "Modifier le collaborateur" : "Ajouter un collaborateur"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CreateCollab onClose={handleCloseCreateModal} editCollabData={editCollabData} restaurantId={restaurantId.restaurantId} />
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

export default Collaborators;

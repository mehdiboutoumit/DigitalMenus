import React, { Fragment, useState } from "react";
import { MDBDataTable } from "mdbreact";
import dataCollab from "./dataCollab.jsx";
import { Dropdown, Button, Modal } from "react-bootstrap";
import CreateCollab from "./createCollab";

const Collaborators = () => {
  const rows = dataCollab;
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editCollabData, setEditCollabData] = useState(null);

  const data = {
    columns: [
      { label: "Nom", field: "name", sort: "asc" },
      { label: "Image", field: "image", sort: "asc" },
      { label: "Email", field: "email", sort: "asc" },
      { label: "Role", field: "role", sort: "asc" },
      { label: "Notes", field: "notes", sort: "asc" },
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
                <CreateCollab editCollabData={editCollabData} />
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
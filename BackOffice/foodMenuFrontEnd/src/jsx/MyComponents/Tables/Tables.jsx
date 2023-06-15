import React, { Fragment, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import dataTables from "./dataTables.jsx";
import { Dropdown, Button, Modal } from "react-bootstrap";
import CreateTables from './CreateTable.jsx';
import axios from "axios";

const Tables = ({restaurantId}) => {
 
  //const rows = dataTables;
  const [rows , setRows] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTableData, seteditTableData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/table/restaurant/${restaurantId}`);
      setRows(response.data.tables);
      console.log(response.data.tables)
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, [] );

  const data = {
    columns: [
    //  { label: "id", field: "id", sort: "asc" },
      { label: "Numero de la table", field: "numTable", sort: "asc" },
      { label: "Nombre de personnes", field: "size" },
      { label: "Menu", field: "menu" },
      {label : "Actions", field : "actions"}
     
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
    // Set the collaborator data to editTableData state
    seteditTableData(rowData);
    // Show the create modal
    setShowCreateModal(true);
  };

  const handleDelete = async(rowData) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/table/delete/${rowData.id}`);
      fetchData();
     
    } catch (error) {
      console.error('Error deleting tables:', error);
    }    console.log("Delete", rowData);
  };

  const handleShowCreateModal = () => {
    // Reset the editTableData state when showing the create modal
    seteditTableData(null);
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
              Ajouter une table
            </Button>

            <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {editTableData ? "Modifier une table" : "Ajouter une table"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CreateTables onCloseModal={handleCloseCreateModal} editTableData={editTableData} restaurantId={restaurantId} />
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

export default Tables;

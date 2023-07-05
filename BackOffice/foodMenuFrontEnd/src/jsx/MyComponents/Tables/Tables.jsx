import React, { Fragment, useState, useEffect, useContext } from "react";
import { MDBDataTable } from "mdbreact";
// import dataTables from "./dataTables.jsx";
import { Dropdown, Button, Modal } from "react-bootstrap";
import CreateTables from './CreateTable.jsx';
import axios from "axios";
import QRCode from 'qrcode.react';
import AuthContext from "../../../context/AuthProvider.js";
import { ToastContainer, toast } from "react-toastify";


const Tables = ({restaurantId}) => {
  
  const {auth} = useContext(AuthContext);
  const {accessToken} = auth;
 
  //const rows = dataTables;
  const [rows , setRows] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTableData, seteditTableData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/table/restaurant/${restaurantId}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      const tableData = response.data.tables;

      // Fetch menu details for each row
      const updatedRows = await Promise.all(
        tableData.map(async (row) => {
          const menuIds = JSON.parse(row.id_menus);
          const menuList = await getMenuDetails(menuIds);
          console.log("Menulist",menuList);

          return {
            ...row,
            id_menus: (
              <div>
                {menuList.map((menu) => (
                  <div key={menu.menu.id}>
                  <a  href={`/ShowMenu/${menu.menu.id}`}>
                    <img
                      src={`http://localhost:5000/images/${menu.menu.image}`}
                      alt={menu.menu.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '10%',
                        objectFit: 'cover',
                        marginRight: '20px'
                      }}
                    />
                    {menu.menu.name}
                  </a>
                  </div>
                ))}
              </div>
            ),
          };
        })
      );

      setRows(updatedRows);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };
  const getMenuDetails = async (menuIds) => {
    const menuList = [];

    for (const menuId of menuIds) {
      try {
        const response = await axios.get(`http://localhost:5000/api/menus/${menuId}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        const menu = response.data;

        menuList.push(menu);
      } catch (error) {
        console.error(`Error fetching menu with ID ${menuId}:`, error);
      }
    }

    return menuList;
  };
  useEffect(() => {

    fetchData();
  }, [] );

  const handleGenerateQRCode = (tableId) => {
    if(window.confirm("Generer le code QR ?")){
    // Generate the QR code containing the table ID and menu IDs
    const qrCodeData = {
      id: tableId,
    };
  
    // Convert the qrCodeData object to a JSON string
    const qrCodeDataString = JSON.stringify(qrCodeData);
  
    // Generate the QR code image using the qrCodeDataString
    const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeDataString)}`;
  
    // Log the generated QR code data
    console.log('QR code generated:', qrCodeData);
  
    // Open a new tab or window with the generated QR code image
    window.open(qrCodeImageUrl, '_blank');
  }
  };
  

  const data = {
    columns: [
    //  { label: "id", field: "id", sort: "asc" },
      { label: "Numero de la table", field: "numTable", sort: "asc" },
      { label: "Nombre de personnes", field: "size" },
      { label: "Menus", field: "id_menus" },
      { label: "code QR", field: "qr" },
      {label : "Actions", field : "actions"}
     
    ],
    rows: rows.map((row) => ({
      ...row,
      qr : <QRCode value={JSON.stringify({id : row.id})} />
      ,
      actions: (
        <div>
        <Dropdown>
          <Dropdown.Toggle variant="info" id="actions-dropdown"></Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item onClick={() =>handleGenerateQRCode(row.id)}>Generer QR</Dropdown.Item>
          <Dropdown.Item onClick={() => handleEdit(row)} >Modifier</Dropdown.Item >
            <Dropdown.Item onClick={() => handleDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
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
    toast.success("Table creé ✅ !", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    setShowCreateModal(false);
    try{
      fetchData();}catch(e){
        console.log(e);
      }
  };

  return (
    <Fragment>
      <div className="row ">
        <div className="col-xl-12 ">
          <div className="table-responsive">
          <div className="d-flex justify-content-end mb-3 ">
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
            <ToastContainer
                           position="top-right"
                           autoClose={5000}
                           hideProgressBar={false}
                           newestOnTop
                           closeOnClick
                           rtl={false}
                           pauseOnFocusLoss
                           draggable
                           pauseOnHover
                        />
            </div>

            <div className="display mb-4 dataTablesCard text-center">
              <MDBDataTable striped small noBottomColumns hover align="middle" data={data} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Tables;

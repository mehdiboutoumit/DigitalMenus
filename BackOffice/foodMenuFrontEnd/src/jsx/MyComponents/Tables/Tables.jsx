import React, { Fragment, useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie'
import { MDBDataTable } from "mdbreact";
// import dataTables from "./dataTables.jsx";
import { Dropdown, Button, Modal } from "react-bootstrap";
import CreateTables from './CreateTable.jsx';
import axios from "axios";
import QRCode from 'qrcode.react';
import AuthContext from "../../../context/AuthProvider.js";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";


const Tables = ({restaurantId}) => {
  
  const {auth} = useContext(AuthContext);
  const {accessToken} = auth;
 const history = useHistory();
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
          console.log(row);
          const menuIds =  row?.id_menus ? JSON.parse(row.id_menus) : null;
          //const menuIds = row?.id_menus;
        if(menuIds){
          const menuList = await getMenuDetails(menuIds);
          console.log("Menulist",menuList);
        

          return {
            ...row,
            div_menus: (
              <div style={{
                width: 'auto',
                margin : '20px',
                display : 'flex',
                flexDirection : 'column',
                alignItems : 'left',
                justifyContent : 'left',
                
              }}>
                {menuList.map((menu, index) => (
                  <div key={index}>
                  <a  href={`/ShowMenu/${menu.menu?.id}`}>
                    <img
                      src={`http://localhost:5000/images/${menu.menu?.image}`}
                      alt={menu.menu?.name}
                      style={{
                        width: '120px',
                        height: '80px',
                        borderRadius: '10%',
                        objectFit: 'cover',
                        marginRight: '20px',
                        margin : '10px'
                      }}
                    />
                    {menu.menu?.name}
                  </a>
                  </div>
                ))}
              </div>
            ),
          };
        }
      else{ return {
        ...row,
            div_menus : <div></div>
      }}})
      );

      setRows(updatedRows);
    } catch (error) {
      // if (error.response?.status === 401) {
      //   history.push('/login');
      // } else {
      //   history.push('/error500');
      // }
      swal("Error");
      console.error('Error fetching tables:', error);
    }
  };
  const getMenuDetails = async (menuIds) => {
    const menuList = [];

    for (const menuId of menuIds) {
      try {
        const response = await axios.get(`http://localhost:5000/api/menus/${menuId}`, {
          headers: {
            authorization: `Bearer ${Cookies.get('accessToken')}`,
            id : `Bearer ${Cookies.get('userId')}`
          },
        });
        const menu = response.data;

        menuList.push(menu);
      } catch (error) {
        swal("Erreur !");
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
      { label: "Menus", field: "div_menus" },
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
    console.log(rowData);
    // Show the create modal
    setShowCreateModal(true);
  };

  const handleDelete = (rowData) => {
    swal({
      title: `êtes-vous sûr de vouloir supprimer cete table ?`,
      text:
         "Cette action est irréversible",
      icon: "warning",
      buttons: true,
      buttons: [ "Annuler","Supprimer"],
      dangerMode: true,
   }).then(async(willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`http://localhost:5000/api/table/delete/${rowData.id}`);
          fetchData();
         
        } catch (error) {
          console.error('Error deleting tables:', error);
        }   

         swal(
            "Table supprimée avec succes !",
            {
               icon: "success",
            }
         );
      }
    })
    
  };

  const handleShowCreateModal = () => {
    // Reset the editTableData state when showing the create modal
    seteditTableData(null);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
   
      seteditTableData([]);
   
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
           
            </div>

            <div className="display mb-4 dataTablesCard text-center">
              <MDBDataTable striped small noBottomColumns hover align="middle" data={data} />
            </div>
          </div>
        </div>
      </div>
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
    </Fragment>
  );
};

export default Tables;

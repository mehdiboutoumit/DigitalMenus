import axios from 'axios';
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../../api/baseURL'
import { Button, Modal } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import CreateAccount from './CreateAccount';
import { ToastContainer, toast } from 'react-toastify';

function Accounts() {
  const [users, setUsers] = useState([]);
  const cd =  Cookies.get('userId');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editAccountData, seteditAccountData] = useState(null);

  const fetchData = async ()=> {
    try {
      const res = await axios.get(`${baseURL}/user/${cd}` );
      setUsers(res.data.users)

      return res.data.users;
      
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(()=>{
    fetchData();
  },[])

  const handleEdit = (rowData) => {
    // Set the collaborator data to editAccountData state
    seteditAccountData(rowData);
    // Show the create modal
    setShowCreateModal(true);
  };

  const handleDelete = (rowData) => {
    // Handle delete action
    console.log("Delete", rowData);
  };


  const handleShowCreateModal = () => {
    seteditAccountData(null);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    toast.success("Termine avec succes ✅ !", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    try {
      fetchData();
    } catch (error) {
      
    }
  };

  const data = {
    columns: [
     /// { label: 'ID', field: 'id', sort: 'asc', width: 100 },
      { label: 'Nom', field: 'name', sort: 'asc' },
      { label: 'Email', field: 'email', sort: 'asc' },
      { label: 'Type d\'acces', field: 'accessType', sort: 'asc' },
      { label: "Actions", field: "actions" },
    ],
    rows: users.map((row) => ({
        ...row,
        name : row.id === Cookies.get('userId') ? row.name + " (Vous)" : row.name,
        actions: ( <div>
          <Button variant='info' onClick={() => handleEdit(row)}><i className='flaticon-381-edit'></i></Button>
          <Button variant='danger' onClick={() => handleDelete(row.id)} ><i className='flaticon-381-trash'></i></Button>
          </div>
        ),
      })),
  };

  return (
    <>
  
    
       <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
          <div className="d-flex justify-content-end mb-3"> 
          <Button variant="primary" onClick={handleShowCreateModal}>
              Ajouter un Compte
      </Button>
      </div>
      <div className="display mb-4 dataTablesCard">
          <MDBDataTable
            striped
            small
            noBottomColumns
            hover
            align="middle"
            data={data}
          />
          </div>
          </div>
        </div>
      </div>
    

<Modal show={showCreateModal} onHide={handleCloseCreateModal}>
    <Modal.Header closeButton>
      <Modal.Title>
        {editAccountData ? "Modifier le compte" : "Ajouter un compte"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <CreateAccount onClose={handleCloseCreateModal} editAccountData={editAccountData} />
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
</>

  )
}

export default Accounts
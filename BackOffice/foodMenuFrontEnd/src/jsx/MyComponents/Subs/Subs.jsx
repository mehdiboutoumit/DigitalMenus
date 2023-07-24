import axios from 'axios';
import Cookies from 'js-cookie'
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { baseURL } from '../../../api/baseURL';
import { Button, Modal } from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify'
import swal from 'sweetalert'


function Subs() {
  const [subs, setSubs] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedSub, setSelectedSub]= useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseURL}/sub/`);
      console.log(res);
      setSubs(res.data.subs)
      
    } catch (error) {
      
    }
  }

  useEffect(async ()=>{
     fetchData()
  }
  ,[])

  const data = {
    columns: [
     /// { label: 'ID', field: 'id', sort: 'asc', width: 100 },
      { label: 'Name', field: 'name', sort: 'asc' },
      { label: 'Email', field: 'email', sort: 'asc' },
      { label: 'Points', field: 'points', sort: 'asc' },
      { label: "Actions", field: "actions" },
    ],
    rows: subs.map((row) => ({
        ...row,
        actions: ( <div>
          <Button variant='info' onClick={() => handleEdit(row)}><i className='flaticon-381-edit'></i></Button>
          <Button variant='danger' onClick={() => handleDelete(row)} ><i className='flaticon-381-trash'></i></Button>
          </div>
        ),
      })),
  };

  const handleEdit = (row) => {
    setSelectedSub(row);
    setEditModalShow(true);
  };
  const handleCloseEditModal = () => {
    setEditModalShow(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSub((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };

  const handleSaveEditModal = async (row) => {

    const editedSub = new FormData();
  editedSub.append('id', selectedSub.id);
  editedSub.append('name', selectedSub.name);
  editedSub.append('email', selectedSub.email);
  editedSub.append('points', selectedSub.points);
  axios.put(`${baseURL}/sub/update/${row.id}`, editedSub, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${Cookies.get(Cookies.get('accessToken'))}`,
      id : `Bearer ${Cookies.get('userId')}`
    }
  })
    .then((response) => {
      toast.success("Abonne mis à jour ✅ !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
     });
     fetchData()
      console.log(response);
    })
    .catch((error) => {
      if (error.response?.status === 401) {
        //history.push('/login');
        window.location.href = "/login"
      } else {
        //history.push('/error500');
        window.location.href = "/error500"
      }
    });
    // Close the edit modal
    handleCloseEditModal();
  }

  const handleDelete = (id) => {
    swal({
      title: `êtes-vous sûr de vouloir supprimer cet abonne ?`,
      text:
         "Cette action est irréversible",
      icon: "warning",
      buttons: true,
      buttons: [ "Annuler","Supprimer"],
      dangerMode: true,
   }).then((willDelete) => {
      if (willDelete) {
        axios
        .delete(`http://localhost:5000/api/sub/delete/${id}`)
        .then(() => fetchData())
        .catch((error) => {
          swal("Erreur");
          console.log(error);
        });

         swal(
            "Abonne supprimé avec succes !",
            {
               icon: "success",
            }
         );
      }
    })
 
  };

  return (
    <>
      <div className='text-center border border-primary'> <h1>Abonnés </h1></div>
      <div className='border m-3'>
      <MDBDataTable  striped
                small
                noBottomColumns
                hover
                data={data}></MDBDataTable>
      </div>

      <Modal show={editModalShow} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form inputs for editing restaurant */}
          {selectedSub && (
            <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={selectedSub.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={selectedSub.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Points</label>
              <textarea
                className="form-control"
                name="points"
                value={selectedSub.points}
                onChange={handleInputChange}
                rows="6"
              ></textarea>
            </div>
          </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEditModal}>
            Save Changes
          </Button>
        </Modal.Footer>
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

export default Subs
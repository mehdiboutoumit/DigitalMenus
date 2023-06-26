import React, { Fragment, useState, useEffect, useContext } from 'react';
import { MDBDataTable } from 'mdbreact';
import dataRestau from './dataRestau.jsx';
import { Link } from 'react-router-dom';
import { Button , Modal} from 'react-bootstrap';
import axios from 'axios';
import AuthContext from '../../../context/AuthProvider.js';
import { frontURL } from '../../../api/frontURL.js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min.js';


function Restaurants() {
  //const dataRestaurants = dataRestau;
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  const{ accessToken } = auth;
  console.log("Provider",auth) //undefined
  const [expandedRestaurantId, setExpandedRestaurantId] = useState(null);
  const [truncatedDescriptions, setTruncatedDescriptions] = useState([]);
  const [dataRestaurants, setdataRestaurants] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');


  const fetchData = async () => {
  
    try {
      const response = await axios.get('http://localhost:5000/api/restaurant/', {
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
});
      setdataRestaurants(response.data.restaurants);
    } catch (error) {
      history.push(`/login`)
      console.error('Error fetching restaurants:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, [] );


  const handleEdit = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setId(restaurant.id);
    setName(restaurant.name);
    setAddress(restaurant.address);
    setImage(restaurant.image);
    setDescription(restaurant.description);
    setEditModalShow(true);

  };

  const handleCloseEditModal = () => {
    setEditModalShow(false);
    setSelectedRestaurant(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRestaurant((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };

  const handleUpload = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
   }
  // const getCircularReplacer = (obj) => {
  //   const seen = new WeakSet();

  //   const transData = (data) => {
  //     let result = {};
    

  //   if (seen.has(data)){
  //     return;
  //   }

   
    
  //     if (typeof data === "object" ) {
  //       seen.add(data);
  //       for (let key in data){
  //         result[key]= transData(data[key]);
  //       }
  //     }
  //     else {
  //       return data;
  //     }
     
  //   }
  //   transData(obj);
  // };
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  const handleSaveEditModal = async () => {
  
    // const editedRestaurant = {
    //   name : selectedRestaurant.name,
    //   address : selectedRestaurant.address,
    //   image : selectedRestaurant.image,
    //   description : selectedRestaurant.description

    // };
  
    // const editedRestaurant = {
    //   id: selectedRestaurant.id,
    //   name: selectedRestaurant.name,
    //   address: selectedRestaurant.address,
    //   image: image,
    //   description: selectedRestaurant.description
    // };
    // console.log("selec3tedRestaurant");

    // console.log(editedRestaurant);
    const ID = selectedRestaurant.id;
  //  try {
      
  //     const response = await axios.patch(
  //       `http://localhost:5000/api/restaurant/update/${ID}`,selectedRestaurant
  //     );
  //     console.log("Handler");
  //     console.log('Restaurant updated successfully');
  //     // Handle success, e.g., show a success message or refresh the data
  //     fetchData();
  //   } catch (error) {
  //     console.error('Error updating restaurant:', error);
  //     // Handle error, e.g., show an error message
  //   }


  const editedRestaurant = new FormData();
  editedRestaurant.append('id', selectedRestaurant.id);
  editedRestaurant.append('name', selectedRestaurant.name);
  editedRestaurant.append('address', selectedRestaurant.address);
  editedRestaurant.append('description', selectedRestaurant.description);
  editedRestaurant.append('image', image);
  
  axios.put(`http://localhost:5000/api/restaurant/update/${ID}`, editedRestaurant, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    // Close the edit modal
    handleCloseEditModal();
  };

  const formatDescription = (description, restaurantId) => {
    return (
      <>
        {description}
        <span
          className="text-primary ml-1"
          style={{ cursor: 'pointer' }}
          onClick={() => handleShowLess(restaurantId)}
        >
          Show Less
        </span>
      </>
    );
  };

  const handleShowLess = (restaurantId) => {
    setExpandedRestaurantId(null);
    setTruncatedDescriptions((prevDescriptions) => {
      return prevDescriptions.filter((descId) => descId !== restaurantId);
    });
  };

  const handleViewMore = (description, restaurantId) => {
    setExpandedRestaurantId(restaurantId);
  };

  const truncateDescription = (description, restaurantId) => {
    const maxCharacters = 100;
    if (description.length <= maxCharacters) {
      return description;
    }
    const truncated = description.slice(0, maxCharacters) + '...';
    return (
      <>
        {truncated}
        <span
          className="text-primary ml-1"
          style={{ cursor: 'pointer' }}
          onClick={() => handleViewMore(description, restaurantId)}
        >
          View more
        </span>
      </>
    );
  };

  const rows = dataRestaurants.map((restaurant) => {
    const isExpanded = restaurant.id === expandedRestaurantId;
    const shouldTruncate = !isExpanded && !truncatedDescriptions.includes(restaurant.id);

    const formattedDescription = shouldTruncate
      ? truncateDescription(restaurant.description, restaurant.id)
      : restaurant.description;

    return {
      id: restaurant.id,
      name: restaurant.name,
      image: (
        <div className="media mb-3" style={{ width: '150px' }}>
          <img
            className="rounded"
            src={`http://localhost:5000/images/${restaurant.image}`}
            style={{ width: '100%' }}
            alt=""
          />
        </div>
      ),
      address: restaurant.address,
      description: isExpanded
        ? formatDescription(restaurant.description, restaurant.id)
        : formattedDescription,
    };
  });

  const data = {
    columns: [
     /// { label: 'ID', field: 'id', sort: 'asc', width: 100 },
      { label: 'Name', field: 'name', sort: 'asc' },
      { label: 'Image', field: 'image', sort: 'asc' },
      { label: 'Address', field: 'address', sort: 'asc' },
      { label: 'Description', field: 'description', sort: 'asc' },
      { label: "Actions", field: "actions" },
    ],
    rows: rows.map((row) => ({
        ...row,
        actions: ( <div>
            <Link to={`/ShowRestaurant/${row.id}`}>
            <i className='flaticon-381-view-2 btn btn-warning'></i>
          </Link> <Button variant='info' onClick={() => handleEdit(row)}><i className='flaticon-381-edit'></i></Button>
          <Button variant='danger' onClick={() => handleDelete(row.id)} ><i className='flaticon-381-trash'></i></Button>
          </div>
        ),
      })),
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce restaurant ?")) {
      axios
        .delete(`http://localhost:5000/api/restaurant/delete/${id}`)
        .then(() => fetchData())
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
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

      <Modal show={editModalShow} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form inputs for editing restaurant */}
          {selectedRestaurant && (
            <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={selectedRestaurant.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={(e)=> {handleUpload(e)}}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={selectedRestaurant.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={selectedRestaurant.description}
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

    </Fragment>
  );
}

export default Restaurants;

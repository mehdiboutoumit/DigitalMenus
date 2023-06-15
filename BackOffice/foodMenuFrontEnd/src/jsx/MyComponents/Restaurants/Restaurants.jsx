import React, { Fragment, useState, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import dataRestau from './dataRestau.jsx';
import { Link } from 'react-router-dom';
import { Button , Modal} from 'react-bootstrap';
import axios from 'axios';

function Restaurants() {
  //const dataRestaurants = dataRestau;
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
      const response = await axios.get(`http://localhost:5000/api/restaurant/`);
      setdataRestaurants(response.data.restaurants);
    } catch (error) {
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

  
  const handleSaveEditModal = async () => {
  
    // const editedRestaurant = {
    //   name : selectedRestaurant.name,
    //   address : selectedRestaurant.address,
    //   image : selectedRestaurant.image,
    //   description : selectedRestaurant.description

    // };
  
    const editedRestaurant = {
      id: selectedRestaurant.id,
      name: selectedRestaurant.name,
      address: selectedRestaurant.address,
      image: selectedRestaurant.image,
      description: selectedRestaurant.description
    };
    const ID = selectedRestaurant.id;
        try {
      
      const response = await axios.put(
        `http://localhost:5000/api/restaurant/${ID}`,
        {
          name,
          address,
          description,
          image,
        }
      );
      console.log("Handler");
      console.log('Restaurant updated successfully');
      // Handle success, e.g., show a success message or refresh the data
      fetchData();
    } catch (error) {
      console.error('Error updating restaurant:', error);
      // Handle error, e.g., show an error message
    }
  
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
            src={restaurant.image}
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
          <Button variant='danger' ><i className='flaticon-381-trash'></i></Button>
          </div>
        ),
      })),
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
                onChange={handleInputChange}
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

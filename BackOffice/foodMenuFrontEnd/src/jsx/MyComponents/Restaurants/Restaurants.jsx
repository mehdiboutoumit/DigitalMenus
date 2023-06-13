import React, { Fragment, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import dataRestau from './dataRestau.jsx';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Restaurants() {
  const dataRestaurants = dataRestau;
  const [expandedRestaurantId, setExpandedRestaurantId] = useState(null);
  const [truncatedDescriptions, setTruncatedDescriptions] = useState([]);

  const handleEdit = () =>{

  }

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
      { label: 'ID', field: 'id', sort: 'asc', width: 100 },
      { label: 'Name', field: 'name', sort: 'asc' },
      { label: 'Image', field: 'image', sort: 'asc' },
      { label: 'Address', field: 'address', sort: 'asc' },
      { label: 'Description', field: 'description', sort: 'asc' },
      { label: "Actions", field: "actions" },
    ],
    rows: rows.map((row) => ({
        ...row,
        actions: ( <div>
            <Link to="/ShowRestaurant">
            <i className='flaticon-381-view-2 btn btn-warning'></i>
          </Link> <Button variant='info' onClick={handleEdit}><i className='flaticon-381-edit'></i></Button>
          <Button variant='danger' onClick={handleEdit}><i className='flaticon-381-trash'></i></Button>
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
    </Fragment>
  );
}

export default Restaurants;

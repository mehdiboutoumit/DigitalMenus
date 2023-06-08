import React, { Fragment, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import dataDishes from './dataDishes';
import { Button, Modal } from 'react-bootstrap';
import CreateDish from './CreateDish';
import '../../index.css';

function Dishes() {
  const dataDish = dataDishes;
  const [expandedDishIDs, setExpandedDishIDs] = useState(null);
  const [truncatedDescriptions, setTruncatedDescriptions] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editDishData, setEditDishData] = useState(null);

  const handleEdit = (rowData) => {
    setEditDishData(rowData);
    setShowCreateModal(true);
  };

  const handleShowCreateModal = () => {
    setEditDishData(null);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const formatDescription = (description, dishID) => {
    return (
      <>
        {description}
        <span
          className="text-primary ml-1"
          style={{ cursor: 'pointer' }}
          onClick={() => handleShowLess(dishID)}
        >
          Show Less
        </span>
      </>
    );
  };

  const handleShowLess = (dishID) => {
    setExpandedDishIDs(null);
    setTruncatedDescriptions((prevDescriptions) =>
      prevDescriptions.filter((descId) => descId !== dishID)
    );
  };

  const handleViewMore = (description,dishID) => {
    setExpandedDishIDs(dishID);
  };

  const truncateDescription = (description, dishID) => {
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
          onClick={() => handleViewMore(description,dishID)}
        >
          View more
        </span>
      </>
    );
  };

  const rows = dataDish.map((dish) => {
    const isExpanded = dish.id === expandedDishIDs;
    const shouldTruncate = !isExpanded && !truncatedDescriptions.includes(dish.id);

    const formattedDescription = shouldTruncate
      ? truncateDescription(dish.description, dish.id)
      : dish.description;

    return {
      id: dish.id,
      name: dish.name,
      image: (
        <div className="media mb-3" style={{ width: '150px' }}>
          <img className="rounded" src={dish.image} style={{ width: '100%' }} alt="" />
        </div>
      ),
      description: isExpanded
        ? formatDescription(dish.description, dish.id)
        : formattedDescription,
      is_sold_out: dish.is_sold_out ?  (
        <span className="text-danger">Non</span>
      ) : (
        <span className="text-success">Oui</span>
      ),
      preparation_time: dish.preparation_time,
      calories: dish.calories,
      price: dish.price,
      category: dish.category,
      actions: (
        <div>
          <Button variant="info" onClick={() => handleEdit(dish)}>
            <i className="flaticon-381-edit"></i>
          </Button>
          <Button variant="danger" onClick={handleEdit}>
            <i className="flaticon-381-trash"></i>
          </Button>
        </div>
      ),
    };
  });

  const data = {
    columns: [
      { label: 'ID', field: 'id', sort: 'asc', width: 100 },
      { label: 'Name', field: 'name', sort: 'asc' },
      { label: 'Image', field: 'image', sort: 'asc' },
      { label: 'Category', field: 'category', sort: 'asc' },
      { label: 'Description', field: 'description', sort: 'asc' ,width : '100px'},
      { label: 'Disponible ?', field: 'is_sold_out', sort: 'asc' },
      { label: 'Calories', field: 'calories', sort: 'asc' },
      { label: 'Prix', field: 'price', sort: 'asc' },
      { label: 'Actions', field: 'actions' },
    ],
    rows: rows,
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            <div className="d-flex justify-content-end mb-3">
              <Button variant="primary" onClick={handleShowCreateModal}>
                Ajouter un plat
              </Button>
            </div>
            <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {editDishData ? 'Modifier le plat' : 'Ajouter un plat'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CreateDish editDishData={editDishData} />
              </Modal.Body>
            </Modal>
            <div className="display mb-4 dataTablesCard">
              <MDBDataTable striped small noBottomColumns hover align="middle" data={data} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Dishes;

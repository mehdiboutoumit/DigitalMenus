import React, { Fragment, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import dataCatag from './dataCateg'
import { Link } from '@material-ui/core';
import { Button, Modal } from 'react-bootstrap';
import CreateCategory from './createCategory';

function Categories() { 
  const dataCategories = dataCatag;
  const [expandedcategoryID, setExpandedcategoryID] = useState(null);
  const [truncatedDescriptions, setTruncatedDescriptions] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editCategoryData, seteditCategoryData] = useState(null);

  const handleEdit = (rowData) =>{
     // Set the collaborator data to editCategoryData state
     seteditCategoryData(rowData);
     // Show the create modal
     setShowCreateModal(true);
  }

  const handleShowCreateModal = () => {
    // Reset the editCategoryData state when showing the create modal
    seteditCategoryData(null);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const formatDescription = (description, categoryID) => {
    return (
      <>
        {description}
        <span
          className="text-primary ml-1"
          style={{ cursor: 'pointer' }}
          onClick={() => handleShowLess(categoryID)}
        >
          Show Less
        </span>
      </>
    );
  };

  const handleShowLess = (categoryID) => {
    setExpandedcategoryID(null);
    setTruncatedDescriptions((prevDescriptions) => {
      return prevDescriptions.filter((descId) => descId !== categoryID);
    });
  };

  const handleViewMore = (description, categoryID) => {
    setExpandedcategoryID(categoryID);
  };

  const truncateDescription = (description, categoryID) => {
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
          onClick={() => handleViewMore(description, categoryID)}
        >
          View more
        </span>
      </>
    );
  };

  const rows = dataCategories.map((category) => {
    const isExpanded = category.id === expandedcategoryID;
    const shouldTruncate = !isExpanded && !truncatedDescriptions.includes(category.id);

    const formattedDescription = shouldTruncate
      ? truncateDescription(category.description, category.id)
      : category.description;

    return {
      id: category.id,
      name: category.name,
      image: (
        <div className="media mb-3" style={{ width: '150px' }}>
          <img
            className="rounded"
            src={category.image}
            style={{ width: '100%' }}
            alt=""
          />
        </div>
      ),
      address: category.address,
      description: isExpanded
        ? formatDescription(category.description, category.id)
        : formattedDescription,
    };
  });

  const data = {
    columns: [
      { label: 'ID', field: 'id', sort: 'asc', width: 100 },
      { label: 'Name', field: 'name', sort: 'asc' },
      { label: 'Image', field: 'image', sort: 'asc' },
      { label: 'Description', field: 'description', sort: 'asc' },
      { label: "Actions", field: "actions" },
    ],
    rows: rows.map((row) => ({
        ...row,
        actions: ( <div>
 <Button variant='info' onClick={() => handleEdit(row)}><i className='flaticon-381-edit'></i></Button>
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
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary" onClick={handleShowCreateModal}>
              Ajouter une categorie
            </Button>

            <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {editCategoryData ? "Modifier la categorie" : "Ajouter une categorie"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CreateCategory editCategoryData={editCategoryData} />
              </Modal.Body>
            </Modal>
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
    </Fragment>
  );
}

export default Categories;

import React, { Fragment, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import dataMenus from './dataMenus';
import { Link } from '@material-ui/core';
import { Button, Modal } from 'react-bootstrap';
import CreateMenu from './CreateMenu';
import ShowMenu from './ShowMenu';

function Menus() {
  const datamenu = dataMenus;
  const [expandedMenuID, setExpandedMenuID] = useState(null);
  const [truncatedDescriptions, setTruncatedDescriptions] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editMenuData, setEditMenuData] = useState(null);

  const [showMenu, setShowMenu] = useState(false);

  const showMenuComponent = () => {
    setShowMenu(true);
  };

  const handleCloseShowMenu = () => {
    setShowCreateModal(false);
    setShowMenu(false);
  };

  const handleEdit = (rowData) => {
    // Set the menu data to editMenuData state
    setEditMenuData(rowData);
    // Show the create modal
    setShowCreateModal(true);
  };

  const handleShowCreateModal = () => {
    // Reset the editMenuData state when showing the create modal
    setEditMenuData(null);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };




  const formatDescription = (description, menuID) => {
    return (
      <>
        {description}
        <span
          className="text-primary ml-1"
          style={{ cursor: 'pointer' }}
          onClick={() => handleShowLess(menuID)}
        >
          Show Less
        </span>
      </>
    );
  };

  const handleShowLess = (menuID) => {
    setExpandedMenuID(null);
    setTruncatedDescriptions((prevDescriptions) => {
      return prevDescriptions.filter((descId) => descId !== menuID);
    });
  };

  const handleViewMore = (description, menuID) => {
    setExpandedMenuID(menuID);
  };

  const truncateDescription = (description, menuID) => {
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
          onClick={() => handleViewMore(description, menuID)}
        >
          View more
        </span>
      </>
    );
  };

  const rows = datamenu.map((menu) => {
    const isExpanded = menu.id === expandedMenuID;
    const shouldTruncate = !isExpanded && !truncatedDescriptions.includes(menu.id);

    const formattedDescription = shouldTruncate
      ? truncateDescription(menu.description, menu.id)
      : menu.description;

    return {
      id: menu.id,
      name: menu.name,
      image: (
        <div className="media mb-3" style={{ width: '150px' }}>
          <img className="rounded" src={menu.image} style={{ width: '100%' }} alt="" />
        </div>
      ),
      description: isExpanded
        ? formatDescription(menu.description, menu.id)
        : formattedDescription,
      updatedAt: menu.updatedAt,
    };
  });

  const data = {
    columns: [
      { label: 'ID', field: 'id', sort: 'asc', width: 100 },
      { label: 'Name', field: 'name', sort: 'asc' },
      { label: 'Image', field: 'image', sort: 'asc' },
      { label: 'Description', field: 'description', sort: 'asc' },
      { label: 'Updated At', field: 'updatedAt', sort: 'asc' },
      { label: 'Actions', field: 'actions' },
    ],
    rows: rows.map((row) => ({
      ...row,
      actions: (
        <div>
            <Button variant="primary" onClick={() => showMenuComponent(row)}>
          Ouvrir le menu
        </Button>
          <Button variant="info" onClick={() => handleEdit(row)}>
            <i className="flaticon-381-edit"></i>
          </Button>
          <Button variant="danger" onClick={handleEdit}>
            <i className="flaticon-381-trash"></i>
          </Button>
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
                Ajouter Menu
              </Button>

              <Modal show={showCreateModal || showMenu} onHide={handleCloseCreateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                    {editMenuData ? 'Modifier Menu' : 'Ajouter Menu'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showMenu ? (
                    <ShowMenu menu={editMenuData} />
                    ) : (
                    <CreateMenu editMenuData={editMenuData} />
                    )}
                </Modal.Body>
                </Modal>

                
                <Modal show={showMenu} onHide={handleCloseShowMenu}>
                <Modal.Header closeButton>
                    <Modal.Title>
                    {'Menu details'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                    <ShowMenu menu={editMenuData} />
                    }
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

export default Menus;

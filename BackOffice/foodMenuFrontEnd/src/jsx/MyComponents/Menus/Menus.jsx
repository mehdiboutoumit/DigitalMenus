import React, { Fragment, useState, useEffect, useContext } from 'react';
import { MDBDataTable } from 'mdbreact';
//import dataMenus from './dataMenus';
import { Link } from '@material-ui/core';
import { Button, Modal } from 'react-bootstrap';
import CreateMenu from './CreateMenu';
import ShowMenu from './ShowMenu';
import axios from 'axios';
import AuthContext from '../../../context/AuthProvider';

function Menus({ restaurantId }) {

  const { auth } = useContext(AuthContext);
  const{ accessToken } = auth;
  
const [dataMenus, setDataMenus] = useState([]);
const [refresh, setRefresh] = useState(0);
  const [expandedMenuID, setExpandedMenuID] = useState(null);
  const [truncatedDescriptions, setTruncatedDescriptions] = useState([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editMenuData, setEditMenuData] = useState(null);

  const [showMenu, setShowMenu] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/menus/restaurant/${restaurantId}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      setDataMenus(response.data.menus);
      console.log(response.data.menus)
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, [] );


  const showMenuComponent = (menuId) => {
    //setShowMenu(true);
    window.location.href = `/ShowMenu/${menuId}`;

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
    try{
    fetchData();}catch(e){
      console.log(e);
    }
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

  const rows = dataMenus.map((menu) => {
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
          <img
            className="rounded"
            src={`http://localhost:5000/images/${menu.image}`}
            style={{ width: '100%' }}
            alt=""
          />
        </div>
      ),
      description: isExpanded
        ? formatDescription(menu.description, menu.id)
        : formattedDescription,
      updatedAt: menu.updatedAt,
    };
  });

  const handleDelete = async(Id)=>{
    try {
      const response = await axios.delete(`http://localhost:5000/api/menus/delete/${Id}`);
      // Handle the response if needed
      console.log(response.data); // Assuming the server returns a response message or data
      fetchData();  } 
      catch (error) {
      // Handle the error
      console.error(error);
    }
  };  

  const data = {
    columns: [
      // { label: 'ID', field: 'id', sort: 'asc', width: 100 },
      { label: 'Name', field: 'name' },
      { label: 'Image', field: 'image'},
      { label: 'Description', field: 'description' },
     // { label: 'Updated At', field: 'updatedAt' },
      { label: 'Actions', field: 'actions' },
    ],
    rows: rows.map((row) => ({
      ...row,
      actions: (
        <div>
            <Button variant="primary" onClick={() => showMenuComponent(row.id)}>
          Ouvrir le menu
        </Button>
          <Button variant="info" onClick={() => handleEdit(row)}>
            <i className="flaticon-381-edit"></i>
          </Button>
          <Button variant="danger" onClick={() =>handleDelete(row.id)}>
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
                    <CreateMenu onCloseModal={handleCloseCreateModal} editMenuData={editMenuData} restaurantId={restaurantId} />
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

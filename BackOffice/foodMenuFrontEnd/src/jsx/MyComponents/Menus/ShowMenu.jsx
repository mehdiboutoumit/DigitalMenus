import React, { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import CreateCategory from '../Categories/createCategory';
import CreateDish from '../Dishes/CreateDish';
import Nestable from "react-nestable";
import img from '../../../images/avatar/1.png';

const ShowMenu = ({ menu }) => {
  const [category, setCategory] = useState([]); // names displayed
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [categories, setCategories] = useState({}); // categories with associated dishes
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
const [showCreateDishModal, setShowCreateDishModal] = useState(false);
const [editCategoryData, seteditCategoryData] = useState(null);
const [editDishData, setEditDishData] = useState(null);


  const handleAddCategory = () => {
    setShowCreateCategoryModal(true);
  };

  const handleCloseCreateCategoryModal = () => {
    setShowCreateCategoryModal(false);
  };

  const handleCreateCategory = (newCategory) => {
    const updatedCategory = [...category, newCategory];
    setCategory(updatedCategory);
    handleCloseCreateCategoryModal();
  
    setCategories((prevCategories) => ({
      ...prevCategories,
      [newCategory.name]: [],
    }));
  };

  const handleEditCategory = (categoryIndex) => {
      seteditCategoryData(category[categoryIndex]);
      setShowCreateCategoryModal(true);
  }
  
  const handleDeleteCategory = (categoryName) => {
    const updatedCategories = { ...categories };
    delete updatedCategories[categoryName];
    setCategories(updatedCategories);
  };
  
  const handleEditDish = (categoryName, dishIndex) => {
    const selectedCategory = categories[categoryName];
    const selectedDish = selectedCategory[dishIndex];
    setShowCreateDishModal(true);
    setEditDishData(selectedDish);
  };
 

  const handleDeleteDish = (categoryName, index) => {
    const updatedCategories = { ...categories };
    updatedCategories[categoryName].splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleShowCreateDishModal = (categoryName) => {
    setSelectedCategoryName(categoryName);
    setShowCreateDishModal(true);
  };

  const handleCloseCreateDishModal = () => {
    setShowCreateDishModal(false);
  };


  
  const handleAddDish = (dish) => {
    const updatedCategories = { ...categories };
  
    if (selectedCategoryName && updatedCategories[selectedCategoryName]) {
      updatedCategories[selectedCategoryName] = [...updatedCategories[selectedCategoryName], dish];
      setCategories(updatedCategories);
    }
  
    handleCloseCreateDishModal();
  };
  
  
  
  
  return (
    <>
  <div className="border p-4 justify-content-center " style={{ maxWidth: "70%", margin: "0 auto" }}>
  <Button onClick={handleAddCategory} className="btn btn-primary mx-auto d-block mb-4">
    Ajouter Category
  </Button>
  <hr />

  {Object.entries(categories).map(([categoryName, dishes], categoryIndex) => (
    <div key={categoryIndex} className="mb-4">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card">
            <div className="card-header align-items-center">
              <h2 className="card-title text-center">{categoryName}</h2>
              <div className="d-flex justify-content-center mb-4">
               
                <Button onClick={() => {handleShowCreateDishModal(categoryName);}} className="btn btn-success">
                  Ajouter un plat à {categoryName}
                </Button>
                <Button variant='info' onClick={() => handleEditCategory(categoryIndex)}><i className='flaticon-381-edit'></i></Button>
                <Button onClick={() => handleDeleteCategory(categoryName)} className="btn btn-danger me-2">
                <i className="flaticon-381-trash"></i>
                </Button>
              </div>
            </div>
            <div className="card-body">
              
              <hr />
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-6">
                  <div className="card-content">
                    <div className="nestable">
                      <div className="dd" id={`nestable-${categoryName}`}>
                      <ol className="dd-list">
  {dishes.map((dish, dishIndex) => (
    <li key={dishIndex} className="dd-item border py-2 px-3 d-flex align-items-center justify-content-between" data-id={dishIndex}>
      <div className="d-flex align-items-center">
        <div className="rounded-circle" style={{ width: "50px", height: "50px", overflow: "hidden" }}>
          <img src={img} alt={dish.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="ml-3">{dish.name}</div>
      </div>
      <div>
      <Button className="btn-info border-0" onClick={() => {handleEditDish(categoryName,dishIndex)}}>
        <i className="flaticon-381-edit"></i>
      </Button>
      <Button onClick={() => handleDeleteDish(categoryName, dishIndex) } className="btn-danger border-0">
        <i className="flaticon-381-trash"></i>
      </Button>
      </div>
    </li>
  ))}
</ol>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}

<Button onClick={handleAddCategory} className="btn btn-primary mx-auto d-block mb-4">
    Enregistrer
  </Button>
</div>




      <Modal show={showCreateCategoryModal} onHide={handleCloseCreateCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateCategory editCategoryData={editCategoryData} onCreateCategory={handleCreateCategory} />
        </Modal.Body>
      </Modal>

      <Modal show={showCreateDishModal} onHide={handleCloseCreateDishModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Dish in category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateDish editDishData={editDishData}
            onCreateDish={(dish) => {
              handleAddDish(dish)
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowMenu;

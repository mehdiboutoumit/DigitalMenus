import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import CreateCategory from '../Categories/createCategory';
import CreateDish from '../Dishes/CreateDish';
import img from '../../../images/big/img6.jpg';
import axios from 'axios';


const ShowMenu = () => {
  const {menuId} = useParams();
  const [category, setCategory] = useState([]);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [categories, setCategories] = useState({});
  const [selectedCategoryName, setSelectedCategoryName] = useState({});
  const [showCreateDishModal, setShowCreateDishModal] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [editDishData, setEditDishData] = useState(null);
  //const [categoryId, setCategoryId] = useState('');
  


  useEffect(() => {
    let isMounted = true; // Add a variable to track component mount state
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/category/menu/${menuId}`);
        const categoryData = response.data.categories;
        console.log(categoryData);
  
        // Check if the component is still mounted before updating state
        if (isMounted) {
          const updatedCategory = categoryData.map((category) => category);
          setCategory(updatedCategory);

 
          const updatedCategories = {};
          for (const category of categoryData) {
            const response = await axios.get(`http://localhost:5000/api/dish/category/${category.id}`);
            const dishes = response.data.dishes;
            //   // Check if the dish has an image
            //   if (dish.image && dish.image !== null) {
            //     // Convert the Blob image to a readable format (e.g., Buffer)
            //     const imageBuffer = Buffer.from(dish.image, 'base64');
            //     // Update the dish object with the image buffer
            //     dish.image = imageBuffer;
            //   }
            //   return dish;
            // });
            if (dishes.length > 0) {
              updatedCategories[category.name] = dishes;
            }
            else{
              updatedCategories[category.name] = [];
            }
           

          }
  
          // Check if the component is still mounted before updating state
          if (isMounted) {
            setCategories(updatedCategories);
            console.log(updatedCategories);
         
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
    
  
    // Cleanup function to cancel any ongoing tasks
    // return () => {
    //   isMounted = false;
    // };
  }, []);
  
  const handleSave = async () => {
    try {
      const updatedCategories = {};
  
      for (const [categoryName, dishes] of Object.entries(categories)) {
        // Check if the category already exists
        // let  exist = false;
        const foundCategory = category.find((c) => c.name === categoryName);
        // if (Object.prototype.hasOwnProperty.call(categories, categoryName)) {
        //    // Skip if the category already exists
        //    exist = true;
        // }
  
        // if (!exist){
            const categoryData = {
              id: foundCategory.id,
              name: categoryName,
              image: foundCategory.image,
              description: foundCategory.description,
              id_menu: menuId,
            };
            console.log("categori", categoryData.id);
            // Make a POST request to save the category
            const response = await axios.post('http://localhost:5000/api/category/add', categoryData);
      
  
        for (const dish of dishes) {
   
          // let dexist = false;
          // if (categories[categoryName].find((c) => c.name === dish.name))   
          // {
          //   dexist = true; // Skip if the dish already exists in the category
          // }
          // console.log("exist dish" + categories[categoryName].find((c) => c.name === dish.name));
  // if (!dexist){
          const dishData = {
            id: dish.id,
            name: dish.name,
            image: dish.image,
            description: dish.description,
            is_sold_out: dish.is_sold_out,
            preparation_time: dish.preparation_time,
            calories: dish.calories,
            price: dish.price,
            id_category: foundCategory.id,
          };
          console.log("Dish" + dish.id);
  
          // Make a POST request to save the dish
          await axios.post('http://localhost:5000/api/dish/add', dishData);
   }
        // }
      }
  
      console.log('Data saved successfully!');
      console.log('Updated Categories:', updatedCategories);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  




  const handleAddCategory = () => {
   // console.log(categories);
   setEditCategoryData(null);
    setShowCreateCategoryModal(true);
  };

  const handleCloseCreateCategoryModal = () => {
    setShowCreateCategoryModal(false);
  };

  // const handleCreateCategory = (newCategory) => {
  //   const updatedCategory = [...category, newCategory];
  //   setCategory(updatedCategory);
  //   handleCloseCreateCategoryModal();
  
  //   setCategories((prevCategories) => ({
  //     ...prevCategories,
  //     [newCategory.name]: [],
  //   }));
  // };
  const handleCreateCategory = (newCategory,update) => {
    
    if (update) {
      const existingCategory = category.find((cat) => cat.id === newCategory.id);
      console.log("1"+newCategory);
      // If the category already exists, update it with the new information
      const updatedCategory = {
        ...existingCategory,
        name: newCategory.name,
        image: newCategory.image,
        description: newCategory.description,
      };
  
      // Update the category in the state
      setCategory((prevCategories) =>
        prevCategories.map((cat) => (cat.id === newCategory.id ? updatedCategory : cat))
      );
    } else {
      console.log("2"+newCategory);
      // If the category is not already in the state, add it as a new category
      const updatedCategories = [...category, newCategory];
      setCategory(updatedCategories);
    }
  
    // Close the modal and reset the state
    handleCloseCreateCategoryModal();
  
    // Update the categories state with the new category and an empty array for its dishes
    setCategories((prevCategories) => ({
      ...prevCategories,
      [newCategory.name]: [],
    }));
  };
  

  const handleEditCategory = (categoryIndex) => {
      setEditCategoryData(category[categoryIndex]);
      setShowCreateCategoryModal(true);
  }
  
  const handleDeleteCategory = (id, categoryName) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = { ...categories };
      delete updatedCategories[categoryName];
      setCategories(updatedCategories);
  
      axios
        .delete(`http://localhost:5000/api/category/delete/${id}`)
        .then((response) => {
          // Handle the successful deletion
          console.log("Category deleted successfully");
        })
        .catch((error) => {
          // Handle the error
          console.error("Error deleting category:", error);
        });
    }
  };
  
  
  const handleEditDish = (categoryName, dishIndex) => {
    const selectedCategory = categories[categoryName];
    const selectedDish = selectedCategory[dishIndex];
    setShowCreateDishModal(true);
    setEditDishData(selectedDish);
  };
 

  const handleDeleteDish = (categoryName, index,id) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      // Implement the deletion logic here
      axios
        .delete(`http://localhost:5000/api/dish/delete/${id}`)
        .then((response) => {
          // Handle the successful deletion
          console.log("Dish deleted successfully");
        })
        .catch((error) => {
          // Handle the error
          console.error("Error deleting dish:", error);
        });
    
    const updatedCategories = { ...categories };
    updatedCategories[categoryName].splice(index, 1);
    setCategories(updatedCategories);
      }
  };

  const handleShowCreateDishModal = (categoryName) => {
    // const foundCategory = category.find((c) => c.name === categoryName);
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
  
  const handleUpdateDish = (updatedDish) => {
    const updatedCategories = { ...categories };
  
    // Find the category that contains the updated dish
    const categoryKeys = Object.keys(updatedCategories);
    const categoryToUpdate = categoryKeys.find((categoryName) => {
      return updatedCategories[categoryName].some((dish) => dish.id === updatedDish.id);
    });
  
    if (categoryToUpdate) {
      // Find the index of the dish to be updated
      const dishIndex = updatedCategories[categoryToUpdate].findIndex(
        (dish) => dish.id === updatedDish.id
      );
  
      // Update the dish in the array
      updatedCategories[categoryToUpdate][dishIndex] = updatedDish;
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
                <Button onClick={() => handleDeleteCategory(category[categoryIndex].id,categoryName)} className="btn btn-danger me-2">
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
          {/* <img src={`data:image/jpeg;base64,${Buffer.from(dish.image).toString('base64')}`} alt={dish.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
          <img src={img} alt={dish.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="ml-3">{dish.name}</div>
      </div>
      <div>
      <Button className="btn-info border-0" onClick={() => {handleEditDish(categoryName,dishIndex)}}>
        <i className="flaticon-381-edit"></i>
      </Button>
      <Button onClick={() => handleDeleteDish(categoryName, dishIndex,dish.id) } className="btn-danger border-0">
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

<Button onClick={handleSave} className="btn btn-primary mx-auto d-block mb-4">
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
  {editDishData ? (
    <CreateDish
      editDishData={editDishData}
      onUpdateDish={
        handleUpdateDish
      }
    />
  ) : (
    <CreateDish
      onCreateDish={
        handleAddDish
      }
    />
  )}
</Modal.Body>
      </Modal>
    </>
  );
};

export default ShowMenu;

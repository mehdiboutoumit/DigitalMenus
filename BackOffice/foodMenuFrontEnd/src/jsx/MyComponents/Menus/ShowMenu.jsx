import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import CreateCategory from '../Categories/createCategory';
import CreateDish from '../Dishes/CreateDish';
import axios from 'axios';
import { baseURL } from '../../../api/baseURL';
import CreatePortion from '../Portions/CreatePortion'; 
import CreateExtra from '../Extras/CreateExtra';
import AuthContext from '../../../context/AuthProvider';
import MenuPDF from './MenuPDF';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';




const ShowMenu = () => {
  const { auth } = useContext(AuthContext);
  const{ accessToken } = auth;
  const history = useHistory();
  const {menuId} = useParams();
  const [menuName, setMenuName] = useState("");

  const [category, setCategory] = useState([]);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [categories, setCategories] = useState({});
  const [selectedCategoryName, setSelectedCategoryName] = useState({});


  const [showCreateDishModal, setShowCreateDishModal] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [editDishData, setEditDishData] = useState(null);

  const [selectedDishId, setSelectedDishId] = useState(null);


  const [showCreatePortionModal, setShowCreatePortionModal] = useState(false);
  const [portions, setPortions] = useState([]);
  const [editPortionData, setEditPortionData] = useState(null);


  const [showCreateExtraModal, setShowCreateExtraModal] = useState(false);
  const [extras, setExtras] = useState([]);
  const [editExtraData, setEditExtraData] = useState(null);

  


  useEffect(() => {
    let isMounted = true; // Add a variable to track component mount state
  
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/menus/${menuId}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        setMenuName(res.data.menu.name);
        const response = await axios.get(`http://localhost:5000/api/category/menu/${menuId}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        const categoryData = response.data.categories.map((category) => ({
          ...category,
          fromDB: true, 
        }));       
  
        // Check if the component is still mounted before updating state
        if (isMounted) {
          const updatedCategory = categoryData.map((category) => category);
          setCategory(updatedCategory);

 
          const updatedCategories = {};
          for (const category of categoryData) {
            const response = await axios.get(`http://localhost:5000/api/dish/category/${category.id}`, {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            });
            const dishes = response.data.dishes.map((d) => ({
              ...d,
              fromDB: true, 
            }));
         
            if (dishes.length > 0) {
              updatedCategories[category.name] = dishes;
            }
            else{
              updatedCategories[category.name] = [];
            }
           

          }
          const response = await axios.get(`http://localhost:5000/api/portion/`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          });
          const portionsData = response.data.portions;
          setPortions(portionsData);

          const res = await axios.get(`http://localhost:5000/api/extra/`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          });
          const extrasData = res.data.extras;
          setExtras(extrasData);

          // Check if the component is still mounted before updating state
          if (isMounted) {
            setCategories(updatedCategories);
         
         
          }
        }
      } catch (error) {
        if (error.response?.status === 401) {
          history.push('/login');
        } else {
          history.push('/error500');
        }
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
          const categoryData = new FormData();
          categoryData.append('id', foundCategory.id);
          categoryData.append('name', categoryName);
          categoryData.append('image', foundCategory.image);
          categoryData.append('description', foundCategory.description);
          categoryData.append('id_menu', menuId);
          
          // Make a POST request to save the category
          const response = await axios.post('http://localhost:5000/api/category/add', categoryData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      
  
        for (const dish of dishes) {
   
          // let dexist = false;
          // if (categories[categoryName].find((c) => c.name === dish.name))   
          // {
          //   dexist = true; // Skip if the dish already exists in the category
          // }
          // console.log("exist dish" + categories[categoryName].find((c) => c.name === dish.name));
  // if (!dexist){
    const dishData = new FormData();
    dishData.append('id', dish.id);
    dishData.append('name', dish.name);
    dishData.append('image', dish.image);
    dishData.append('description', dish.description);
    dishData.append('is_sold_out', dish.is_sold_out);
    dishData.append('preparation_time', dish.preparation_time);
    dishData.append('calories', dish.calories);
    dishData.append('price', dish.price);
    dishData.append('id_category', foundCategory.id);
    
    // Make a POST request to save the dish
    await axios.post('http://localhost:5000/api/dish/add', dishData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });


    for (const portion of portions){
      await axios.post('http://localhost:5000/api/portion/add', portion, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
  }
  for (const extra of extras){
    await axios.post('http://localhost:5000/api/extra/add', extra, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
}
    
   }
        // }
      }
     

    
        toast.success("Menu enregistré ✅ !", {
           position: "bottom-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
        });
    
  
      console.log('Data saved successfully!');
      console.log('Updated Categories:', updatedCategories);
    } catch (error) {
      if (error.response?.status === 401) {
        history.push('/login');
      } else {
        history.push('/error500');
      }
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
      toast.success("Categorie modifiée ✅ !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
     });
    } else {
   
      // If the category is not already in the state, add it as a new category
      const updatedCategories = [...category, newCategory];
      setCategory(updatedCategories);
      toast.success("Categorie Ajoutée ✅ !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
     });
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
    swal({
      title: `êtes-vous sûr de vouloir supprimer la categorie ${categoryName}?`,
      text:
         "",
      icon: "warning",
      buttons: true,
      buttons: [ "Annuler","Supprimer"],
      dangerMode: true,
   }).then((willDelete) => {
      if (willDelete) {
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
          swal(
            "Erreur",
         );
          console.error("Error deleting category:", error);

        });
         swal(
            "Categorie supprimée avec succes !",
            {
               icon: "success",
            }
         );
      }
    })
   
  };
  
  
  const handleEditDish = (categoryName, dishIndex) => {
    const selectedCategory = categories[categoryName];
    const selectedDish = selectedCategory[dishIndex];
    setShowCreateDishModal(true);
    setEditDishData(selectedDish);
  };
 

  const handleDeleteDish = (categoryName, index,id) => {
    swal({
      title: `êtes-vous sûr de vouloir supprimer ce plat ?`,
      text:
         "",
      icon: "warning",
      buttons: true,
      buttons: [ "Annuler","Supprimer"],
      dangerMode: true,
   }).then((willDelete) => {
      if (willDelete) {
        axios
        .delete(`http://localhost:5000/api/dish/delete/${id}`)
        .then((response) => {
          // Handle the successful deletion
          console.log("Dish deleted successfully");
        })
        .catch((error) => {
          // Handle the error
          swal("Erreur !")
          console.error("Error deleting dish:", error);
        });
    
    const updatedCategories = { ...categories };
    updatedCategories[categoryName].splice(index, 1);
    setCategories(updatedCategories);
         swal(
            "Plat supprimé avec succes !",
            {
               icon: "success",
            }
         );
      }
    })
 
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
    toast.success("Plat ajouté ✅ !", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
   });
  
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
      toast.success("Plat modifié ✅ !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
     });
    }
    
    handleCloseCreateDishModal();
  };
  
  const handleAddPortion = (dishId) => {
    setSelectedDishId(dishId);
    setShowCreatePortionModal(true);
  };

  const handleCloseCreatePortionModal = () => {
    setShowCreatePortionModal(false);
  };

  const handleCreatePortion = (portion) => {
    setPortions([...portions, portion]);
    toast.success("Portion ajoutée ✅ !", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
   });
  handleCloseCreatePortionModal();
 
  }

  const handleEditPortion= (portion) => {
    setSelectedDishId(portion.id_dish);
    setEditPortionData(portion);
    setShowCreatePortionModal(true);

  }
  const handleUpdatePortion = (updatedPortion) => {
    const updatedPortions = portions.map((portion) =>
      portion.id === updatedPortion.id ? updatedPortion : portion
    );
 
    setPortions(updatedPortions);
    toast.success("Portion modifiée ✅ !", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
   });
    setShowCreatePortionModal(false);
    setEditPortionData(null);
  };
  const handleDeletePortion = (id) => {
    swal({
      title: `êtes-vous sûr de vouloir supprimer cette portion ?`,
      text:
         "",
      icon: "warning",
      buttons: true,
      buttons: [ "Annuler","Supprimer"],
      dangerMode: true,
   }).then((willDelete) => {
      if (willDelete) {
        axios
        .delete(`http://localhost:5000/api/portion/delete/${id}`)
        .then((response) => {
          // Handle the successful deletion
          console.log("Portion deleted successfully");
        })
        .catch((error) => {
          // Handle the error
          if (error.response?.status === 401) {
            history.push('/login');
          } else {
            history.push('/error500');
          }
          console.error("Error deleting portion:", error);
        });
    const updatedPortions = portions.filter((port) => port.id !== id);
    setPortions(updatedPortions);
         swal(
            "Portion supprimée avec succes !",
            {
               icon: "success",
            }
         );
      }
    })
  
  }



  const handleAddExtra = (dishId) => {
    setSelectedDishId(dishId);
    setShowCreateExtraModal(true);
  };

  const handleCloseCreateExtraModal = () => {
    setShowCreateExtraModal(false);
  };

  const handleCreateExtra = (extra) => {
    setExtras([...extras, extra]);
  handleCloseCreateExtraModal();
  toast.success("Extra ajouté ✅ !", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
 });
  console.log("Extra created", extra);
  }

  const handleEditExtra = (extra) => {
    setSelectedDishId(extra.id_dish);
    setEditExtraData(extra);
    setShowCreateExtraModal(true);
  }

  const handleUpdateExtra = (updatedExtra) => {
    const updatedExtras = extras.map((extra) =>
    extra.id === updatedExtra.id ? updatedExtra : extra
  );

  setExtras(updatedExtras);
  setShowCreateExtraModal(false);
  toast.success("Extra modifié ✅ !", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
 });
 setEditExtraData(null);
  }
  const handleDeleteExtra = (id) => {
    swal({
      title: `êtes-vous sûr de vouloir supprimer cet extra ?`,
      text:
         "",
      icon: "warning",
      buttons: true,
      buttons: [ "Annuler","Supprimer"],
      dangerMode: true,
   }).then((willDelete) => {
      if (willDelete) {
        axios
        .delete(`http://localhost:5000/api/extra/delete/${id}`)
        .then((response) => {
          // Handle the successful deletion
          console.log("Extra deleted successfully");
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            history.push('/login');
          } else {
            history.push('/error500');
          }
          console.error("Error deleting extra:", error);
        });
    const updatedExtras = extras.filter((ext) => ext.id !== id);
    setExtras(updatedExtras);
         swal(
            "Extra supprimé avec succes !",
            {
               icon: "success",
            }
         );
      }
    })
  
  }
  
  
  
  return (
    <>
<div className="text-primary text-center">
   <h1 style={{color : 'orange', fontSize: "60px", fontWeight: "bold", fontFamily: "Rockwell Extra Bold" }}>{menuName}</h1>
</div>
<div className="border p-4 justify-content-center " style={{ maxWidth: "70%", margin: "0 auto" }}>
  <Button onClick={handleAddCategory} className="btn btn-primary mx-auto d-block mb-4">
    Ajouter Category
  </Button>
  <hr />

  {/*generate pdf */}
 {/* <MenuPDF></MenuPDF> */}

  {Object.entries(categories).map(([categoryName, dishes], categoryIndex) => (
    <div key={categoryIndex} className="mb-4">
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="card">
          <div className="card-header align-items-center">
            <h2 className="card-title text-center">{categoryName}</h2>
            <div className="d-flex justify-content-center mb-4">

              <img src={category[categoryIndex].fromDB ?  `http://localhost:5000/images/${category[categoryIndex].image}` : category[categoryIndex].imagelocal}  style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '10%',
                        objectFit: 'cover',
                        marginRight: '20px'
                      }} alt="" className="rounded" />
            </div>
            <div className="d-flex justify-content-center mb-4">
              <Button onClick={() => {handleShowCreateDishModal(categoryName);}} className="btn btn-success">
                Ajouter un plat à {categoryName}
              </Button>
              <Button variant='info' onClick={() => handleEditCategory(categoryIndex)}>
                <i className='flaticon-381-edit'></i>
              </Button>
              <Button onClick={() => handleDeleteCategory(category[categoryIndex].id, categoryName)} className="btn btn-danger me-2">
                <i className="flaticon-381-trash"></i>
              </Button>
            </div>
          </div>
          <div className="card-body">
              <hr />
              <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-8">
                  <div className="card-content">
                    <div className="nestable">
                      <div className="dd" id={`nestable-${categoryName}`}>
                      <ol className="dd-list">
                      {dishes.map((dish, dishIndex) => ( 
                                <li key={dishIndex} className="dd-item border py-4 px-5 d-flex flex-column align-items-center justify-content-between" data-id={dishIndex}>
                                  <div className="d-flex align-items-center text-center">
                                    <div className="rounded-circle" style={{ width: "30%", height: "30%", overflow: "hidden" }}>
                                      {/* <img src={`data:image/jpeg;base64,${Buffer.from(dish.image).toString('base64')}`} alt={dish.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> */}
                                      <img src={dish.fromDB ? `http://localhost:5000/images/${dish.image}` : dish.imagelocal} alt={dish.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div className="ml-5">{dish.name}</div>
                                    <div className="ml-5">{dish.calories} Calories</div>
                                    <div className="ml-5" style={{color : 'green', fontWeight : 'bold', fontSize : '20px'}}>{dish.price} DH</div>
                                  </div>
                                  <div>
                                  
                                    <Button className="btn-info border-0" onClick={() => {handleEditDish(categoryName,dishIndex)}}>
                                      <i className="flaticon-381-edit"></i>
                                    </Button>
                                    <Button onClick={() => handleDeleteDish(categoryName, dishIndex,dish.id) } className="btn-danger border-0">
                                      <i className="flaticon-381-trash"></i>
                                    </Button>
                                  </div>
                                

                                  <div className="ml-5 mt-4 col-13">
                    <div className="card mb-3 text-center ">
                      <div className="card-body ">
                        
                        <h5 className="card-title">Portions</h5>
                        <Button className="btn-warning border-0" onClick={() => {handleAddPortion(dish.id)}}>
                                      Ajouter une portion
                                    </Button>
                                    <hr></hr>
                        <ol className="list-unstyled  align-items-center  justify-content-center">
                          {portions.map((portion, portionIndex) => {
                            if (portion.id_dish === dish.id) {
                           // if (true) {
                              return (
                                <li key={portionIndex} className='d-flex align-items-center  justify-content-center'>
                                  <div className='ml-5 mr-2'>{portion.name}</div>
                                  <div className='ml-5 mr-2'>{portion.calories} calories</div>
                                  <div className='ml-5 mr-2' style={{color : 'green'}}>{portion.price} DH</div>
                                  <Button className="btn-info border-0 ml-2" onClick={() => {handleEditPortion(portion)}}> <i className="flaticon-381-edit"></i></Button>
                                  <Button className="btn-danger border-0 ml-2" onClick={() => {handleDeletePortion(portion.id)}}> <i className="flaticon-381-trash"></i></Button>
                                  <hr></hr>
                                </li>
                              );
                            }
                            return null;
                          })}
                        </ol>
                      </div>
                    </div>
                   
                    <div className="card mb-3 text-center ">
                
                      <div className="card-body ">
                    
                        <h5 className="card-title">Extras</h5>
                        <Button className="btn-warning border-0" onClick={() => {handleAddExtra(dish.id)}}>
                                      Ajouter un extra
                                    </Button>
                                    <hr></hr>
                        <ol className="list-unstyled  align-items-center  justify-content-center">
                          {extras.map((extra, extraIndex) => {
                            if (extra.id_dish === dish.id) {
                           // if (true) {
                              return (
                                <li key={extraIndex} className='d-flex align-items-center  justify-content-center'>
                                  <div className='ml-5 mr-2'>{extra.name}</div>
                                  <div className='ml-5 mr-2' style={{color : 'green'}}>{extra.price} DH</div>
                                  <Button className="btn-info border-0 ml-2" onClick={() => {handleEditExtra(extra)}}> <i className="flaticon-381-edit"></i></Button>
                                  <Button className="btn-danger border-0 ml-2" onClick={() => {handleDeleteExtra(extra.id)}}> <i className="flaticon-381-trash"></i></Button>
                                  <hr></hr>
                                </li>
                              );
                            }
                            return null;
                          })}
                        </ol>
                      </div>
                    </div>
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
    Enregistrer
  </Button>
</div>




      <Modal show={showCreateCategoryModal} onHide={handleCloseCreateCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {editCategoryData ? (
      <CreateCategory
        editCategoryData={editCategoryData}
        onUpdateCategory={handleCreateCategory}
      />
    ) : (
      <CreateCategory onCreateCategory={handleCreateCategory} />
    )}
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

      <Modal
        show={showCreatePortionModal}
        onHide={handleCloseCreatePortionModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Portion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePortion
            dishId={selectedDishId}
           editPortion={editPortionData}
           onEditPortion ={handleUpdatePortion}
            onCreatePortion={
              handleCreatePortion
            }


          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showCreateExtraModal}
        onHide={handleCloseCreateExtraModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Extra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateExtra
            dishId={selectedDishId}
            extraToEdit={editExtraData}

            onEditExtra={handleUpdateExtra}
         
            onCreateExtra={
              handleCreateExtra
            }

          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowMenu;

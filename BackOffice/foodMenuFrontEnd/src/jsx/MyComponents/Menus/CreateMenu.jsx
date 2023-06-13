import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// const categories = ['Categ A', 'Categ B', 'Categ C'];

const CreateMenu = ({ editMenuData,  onCloseModal }) => {
  const [name, setName] = useState('');
  const [image, setimage] = useState(null);
  const [description, setDescription] = useState('');
  const [idM,setIdM] = useState('');

  

  // const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setIdM(uuidv4());
    if (editMenuData) {
      // Fill the form fields with the old information

      setName(editMenuData.name || '');
      setimage(editMenuData.image || null);
      setDescription(editMenuData.description || '');
      // setSelectedCategories(editMenuData.categories || []);
    } else {
      // Reset the form fields
      setName('');
      setimage(null);
      setDescription('');
      // setSelectedCategories([]);
    }
  }, [editMenuData]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    let  response = null;
    // Handle form submission
    try {
      // Make an HTTP POST request to your backend API endpoint
     
      if (editMenuData) {
        const { id, name, image, description } = editMenuData;
        // If editMenuData is present, it means we're editing an existing menu
       response = await axios.put(`http://localhost:5000/api/menus/update/${id}`, {
          name,
          image,
          description,
        });
      } else {
       
        console.log(idM);
        // If editMenuData is null, it means we're creating a new menu
        response = await axios.post('http://localhost:5000/api/menus/add', {
         id : idM,
          name,
          image,
          description,
        });
      }
  
      // Handle the response from the server
      console.log('Server response:', response.data);
      // You can perform any further actions based on the response
      onCloseModal();
  
    } catch (error) {
      console.error('Error:', error);
      // Handle the error
    }
    };

  // const handleCategoryChange = (e) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setSelectedCategories((prevCategories) => [...prevCategories, value]);
  //   } else {
  //     setSelectedCategories((prevCategories) => prevCategories.filter((category) => category !== value));
  //   }
  // };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">image</label>
        <input
          type="file"
          className="form-control"
          id="image"
          onChange={(e) => setimage(e.target.files[0])}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      {/* <div className="form-group">
        <label htmlFor="categories">Categories</label>
        {categories.map((category) => (
          <div key={category} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={category}
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            <label className="form-check-label" htmlFor={category}>
              {category}
            </label>
          </div> 
        ))}
      </div>*/}
      <button type="submit" className="btn btn-primary">
        {editMenuData ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
    </>
  );
};

export default CreateMenu;

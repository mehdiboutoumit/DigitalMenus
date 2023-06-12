import React, { useState, useEffect } from 'react';

// const categories = ['Categ A', 'Categ B', 'Categ C'];

const CreateMenu = ({ editMenuData }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  // const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (editMenuData) {
      // Fill the form fields with the old information
      setName(editMenuData.name || '');
      setImage(editMenuData.image || '');
      setDescription(editMenuData.description || '');
      // setSelectedCategories(editMenuData.categories || []);
    } else {
      // Reset the form fields
      setName('');
      setImage('');
      setDescription('');
      // setSelectedCategories([]);
    }
  }, [editMenuData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Submit', { name, image, description });
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
        <label htmlFor="image">Image</label>
        <input
          type="text"
          className="form-control"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
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

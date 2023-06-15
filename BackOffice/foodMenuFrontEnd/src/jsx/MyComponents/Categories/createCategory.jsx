import React, { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';

const CreateCategory = ({ editCategoryData, onCreateCategory, update }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editCategoryData) {
      // Fill the form fields with the old information
      setName(editCategoryData.name || "");
      setImage(editCategoryData.image || "");
      setDescription(editCategoryData.description || "");
    } else {
      // Reset the form fields
      setName("");
      setImage(null);
      setDescription("");
    }
  }, [editCategoryData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editCategoryData){
      update=true;
      console.log("edit true");
      const categoryData = {
        id : editCategoryData.id,
        name: name,
        image: image,
        description: description,
      };
      onCreateCategory(categoryData,update);
    }
    else{
      update = false;
      console.log("edit false");
    const id = uuidv4();
    console.log(id);

    // Handle form submission
    const categoryData = {
      id : id,
      name: name,
      image: image,
      description: description,
    };
    onCreateCategory(categoryData,update);
  }
  };

  return (
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
          type="file"
          className="form-control"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
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
      <button type="submit" className="btn btn-primary">
        {editCategoryData ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
};

export default CreateCategory;

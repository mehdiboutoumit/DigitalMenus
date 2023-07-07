import React, { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import { baseURL } from "../../../api/baseURL";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const CreateCategory = ({ editCategoryData, onCreateCategory, update }) => {
  const [name, setName] = useState("");
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imagelocal, setImagelocal] = useState(null);
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
      setImage("Vide");
      setDescription("");
    }
  }, [editCategoryData]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      if (editCategoryData) {
        update = true;
        console.log("edit true");
        const categoryData = {
          id: editCategoryData.id,
          name: name,
          image: image,
          description: description,
          imagelocal : imagelocal
        };
        const CatData = new FormData();
        CatData.append('id', categoryData.id)
        CatData.append('name', categoryData.name);
        CatData.append('image', categoryData.image);
        CatData.append('description', categoryData.description);
       

        console.log("New", CatData.image)
  
        // Make a POST request to save the dish
        await axios.post('${baseURL}/category/add', CatData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        //onCreateCategory(categoryData,update);
      } else {
        update = false;
        console.log("edit false");
        const id = uuidv4();
        console.log(id);
  
        // Handle form submission
        const categoryData = {
          id: id,
          name: name,
          image: image,
          description: description,
          imagelocal : imagelocal
        };
        onCreateCategory(categoryData, update);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        history.push('/login');
      } else {
        history.push('/error500');
      }
      console.error(error);
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
          onChange={(e) => {setImage(e.target.files[0]); setImagelocal(URL.createObjectURL(e.target.files[0]));}}
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

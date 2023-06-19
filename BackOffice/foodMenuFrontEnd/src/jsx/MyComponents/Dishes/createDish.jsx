import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const CreateDish = ({  editDishData,  onCreateDish, update }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [preparationTime, setPreparationTime] = useState(0);
  const [calories, setCalories] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Set the form fields with editDishData values if it exists
    if (editDishData) {
    
      setName(editDishData.name);
      setImage(editDishData.image);
      setDescription(editDishData.description);
      setIsSoldOut(editDishData.is_sold_out);
      setPreparationTime(editDishData.preparation_time);
      setCalories(editDishData.calories);
      setPrice(editDishData.price);
      setCategory(editDishData.category);
    } else {
    
      // Reset the form fields
      setName("");
      setImage(null);
      setDescription("");
      setIsSoldOut(false);
      setPreparationTime(0);
      setCalories(0);
      setPrice(0);
      setCategory("");
    }
  }, [editDishData]);

  const handleSubmit = async (e) => {
    try {
      if (editDishData) {
        e.preventDefault();
        update = true;
        console.log(update)
        const editedDish = {
          name,
          image,
          description,
          is_sold_out: isSoldOut,
          preparation_time: preparationTime,
          calories,
          price,
        };
  
        // Call the callback function to handle the edit
        //onCreateDish(editedDish, update);
  
        const dishData = new FormData();
       dishData.append('id', editDishData.id)
        dishData.append('name', editedDish.name);
        dishData.append('image', editedDish.image);
        dishData.append('description', editedDish.description);
        dishData.append('is_sold_out', editedDish.is_sold_out);
        dishData.append('preparation_time', editedDish.preparation_time);
        dishData.append('calories', editedDish.calories);
        dishData.append('price', editedDish.price);
       
  
        // Make a POST request to save the dish
        await axios.post('http://localhost:5000/api/dish/add', dishData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        update = false;
        const id = uuidv4();
        e.preventDefault();
        const dishData = {
          id,
          name,
          image,
          description,
          is_sold_out: isSoldOut,
          preparation_time: preparationTime,
          calories,
          price,
        };
        //onCreateDish(dishData, update);
        // Handle form submission
        console.log("Submit", dishData);
        // Reset the form fields
        setName("");
        setImage(null);
        setDescription("");
        setIsSoldOut(false);
        setPreparationTime(0);
        setCalories(0);
        setPrice(0);
        setCategory("");
        onCreateDish(dishData, update);
      }
    } catch (error) {
      // Handle any error that occurred during the submission
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
        />
      </div>
      <div className="form-group">
        <label htmlFor="available">Disponible ?</label>
        <select
          className="form-control"
          id="available"
          value={isSoldOut}
          onChange={(e) => setIsSoldOut(e.target.value === "true")}
        >
          <option value={false}>Oui</option>
          <option value={true}>Non</option>
        </select>
      </div>
     
      <div className="form-group">
        <label htmlFor="preparationTime">Preparation Time</label>
        <input
          type="time"
          className="form-control"
          id="preparationTime"
          value={preparationTime}
          onChange={(e) => setPreparationTime(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="calories">Calories</label>
        <input
          type="number"
          className="form-control"
          id="calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default CreateDish;

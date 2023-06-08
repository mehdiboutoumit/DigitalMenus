import React, { useState, useEffect } from "react";


const categories = ["Dessert", "Lunch", "Dinner"];

const CreateDish = ({ editDishData }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setdescription] = useState("");
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [preparationTime, setPreparationTime] = useState(0);
  const [calories, setCalories] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editDishData) {
      // Fill the form fields with the old information
      setName(editDishData.name || "");
      setImage(editDishData.image || "");
      setdescription(editDishData.description || "");
      setIsSoldOut(editDishData.is_sold_out || false);
      setPreparationTime(editDishData.preparation_time || 0);
      setCalories(editDishData.calories || 0);
      setPrice(editDishData.price || 0);
      setCategory(editDishData.category || "");
    } else {
      // Reset the form fields
      setName("");
      setImage("");
      setdescription("");
      setIsSoldOut(false);
      setPreparationTime(0);
      setCalories(0);
      setPrice(0);
      setCategory("");
    }
  }, [editDishData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Submit", { name, image, description, isSoldOut,
        preparationTime,
        calories,
        price, category });
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
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
     

      <div className="form-group">
  <label htmlFor="available">Disponible ?</label>
  <select
    className="form-control"
    id="available"
    onChange={(e) => setIsSoldOut(e.target.value)}
  >
    <option value={false}>Oui</option>
    <option value={true}>Non</option>
  </select>
</div>

      <div className="form-group">
        <label htmlFor="category">Categorie</label>
        <select
          className="form-control"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Selectionner une categorie</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="preparationTime">Preparation Time (min)</label>
        <input
          type="number"
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
        {editDishData ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default CreateDish;

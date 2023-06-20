import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const CreatePortionModal = ({ onCreatePortion, onEditPortion, dishId, editPortion }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (editPortion) {
      setEditMode(true);
      setName(editPortion.name);
      setCalories(editPortion.calories);
      setPrice(editPortion.price);
    }
  }, [editPortion]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique portion ID
    const portionId = editMode ? editPortion.id : uuidv4();

    // Create a new portion object
    const updatedPortion = {
      id: portionId,
      name: name,
      calories: calories,
      price: price,
      id_dish: dishId
    };

    if (editMode) {
      onEditPortion(updatedPortion);
    } else {
      onCreatePortion(updatedPortion);
    }

    // Reset the form fields
    setName("");
    setCalories(0);
    setPrice(0);
    setEditMode(false);
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
      {editMode ? "Update" : "Create"}
    </button>
  </form>
  );
};

export default CreatePortionModal;

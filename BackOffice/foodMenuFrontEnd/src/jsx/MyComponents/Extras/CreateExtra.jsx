import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const CreateExtraModal = ({ onCreateExtra, onEditExtra, dishId, extraToEdit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (extraToEdit) {
      setName(extraToEdit.name);
      setPrice(extraToEdit.price);
    }
  }, [extraToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique extra ID
    const extraId = uuidv4();

    // Create a new extra object
    const newExtra = {
      id: extraId,
      name: name,
      price: price,
      id_dish: dishId,
    };

    if (extraToEdit) {
      // Pass the updated extra to the parent component
      newExtra.id = extraToEdit.id;
      onEditExtra(newExtra);
    } else {
      // Pass the new extra to the parent component
      onCreateExtra(newExtra);
    }

    // Reset the form fields
    setName("");
    setPrice(0);
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
        {extraToEdit ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default CreateExtraModal;

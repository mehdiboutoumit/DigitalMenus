import React, { useState , useEffect } from "react";

const roles = [
  { id: 1, role: "Serveur" },
  { id: 2, role: "Cuisinier" }
];

const CreateCategory = ({ editCategoryData }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setdescription] = useState("");
  
    useEffect(() => {
      if (editCategoryData) {
        // Fill the form fields with the old information
        setName(editCategoryData.name || "");
        setImage(editCategoryData.image || "");
       
        setdescription(editCategoryData.description || "");
      } else {
        // Reset the form fields
        setName("");
        setImage("");
       
        setdescription("");
      }
    }, [editCategoryData]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log("Submit", { name, image,  description });
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
          <label htmlFor="description">description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {editCategoryData ? "Modifier" : "Ajouter"}
        </button>
      </form>
    );
  };

export default CreateCategory;

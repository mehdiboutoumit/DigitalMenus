import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';

function CreateRestau() {
const [name,setName] = useState('');
const [image, setimage] = useState(null);
const [description, setDescription] = useState('');
const [address,setAddress] = useState('');


 

  const handleUpload = (e)=>{

  }
  const handleSave = async () => {
   const id = uuidv4();
    try {
      const response = await axios.post("http://localhost:5000/api/restaurant/add", {
        id : id,
        name,
        address,
        description,
        image
      });
      console.log("Restaurant saved successfully");
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("Error saving restaurant:", error);
      // Handle error, e.g., show an error message
    }
  };
  return (
    <>
     

     
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Creer un restaurant</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Nom</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"

                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <fieldset className="form-group">
                    <div className="row">
                      <label className="col-form-label col-sm-3 pt-0">
                        Image
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="file"
                          name="image"
                          // onChange={handleUpload}
                          value={image}
                          onChange={(e) => setimage(e.target.value)}
                        />
                       
                      </div>
                      <div className="col-sm-9"></div>
                    </div>
                  </fieldset>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Adresse</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        
                      />
                    </div>
                   </div> 
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Description
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        
                        rows="6"
                      />
                    </div>
                  </div>
                
                </form>
              </div>
            </div>
          </div>
       
         
          <Button
            variant=""
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Enregistrer
          </Button>
       
    </>
  );
}

export default CreateRestau;

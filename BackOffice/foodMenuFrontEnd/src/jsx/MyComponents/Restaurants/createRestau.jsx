import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

function CreateRestau() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  
  const handleChange = (e) => {
    const name = e.target.name;
  
  };

  const handleUpload = (e)=>{

  }
  const handleSave = async () => {
    const formData = new FormData();
    if (form.name) {
      // add function to check files 
      formData.append("file", form.name);
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
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Nom</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        name="name"
                        value={form.name}
                        onChange={handleChange}
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
                          onChange={handleUpload}
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
                        placeholder=""
                        name="Address"
                        value={form.name}
                        onChange={handleChange}
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
                        value={form.description}
                        onChange={handleChange}
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

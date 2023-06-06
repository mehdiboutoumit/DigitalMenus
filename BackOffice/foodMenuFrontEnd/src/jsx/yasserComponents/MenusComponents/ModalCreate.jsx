import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

function ModalCreate({ isModalOpen, handleModal }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [file, setFile] = useState(null);

  // const handleDeleteImage = () => {
  //   setFile(null);
  //   console.log(file);
  // };
  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = async () => {
    const formData = new FormData();
    if (file) {
      // add function to check files 
      formData.append("file", file, file.name);
    }
    if (form.name) {
      formData.append("name", form.name);
    }
    if (form.description) {
      formData.append("description", form.description);
    }
    try {
      const response = await axios.post('http://localhost:5000/menu/add', formData
      );
      console.log('Menu saved successfully:', response.data);
      // Handle success, e.g., show a success message, reset the form, redirect, etc.
    } catch (error) {
      console.error('Error saving menu:', error);
      // Handle error, e.g., show an error message, handle validation errors, etc.
    }

  };
  return (
    <>
      {/* <Button
        variant="primary"
        className="mb-2 mr-2"
        onClick={() => handleModal(true)}
      >
        Large modal
      </Button> */}

      <Modal className="fade bd-example-modal-lg" show={isModalOpen} size="lg">
        <Modal.Header>
          <Modal.Title>Creer un Menu</Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={() => handleModal(false)}
          >
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Le Menu</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">"Name"</label>
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
                        {/* <Button
                          className="btn btn-danger shadow btn-xm sharp"
                          // onClick={handleDeleteImage}
                        >
                          <i className="fa fa-trash "> </i>
                        </Button> */}
                      </div>
                      <div className="col-sm-9"></div>
                    </div>
                  </fieldset>
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
                  {/* <div className="form-group">
                    <div className="row">
                      <label className="col-form-label col-sm-3 pt-0">
                        "Status"
                      </label>
                      <div className="col-sm-9 ">
                        <div className="form-check align-items-center">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={"1"}
                            value={"1"}
                            // checked={
                            //   form[row.field] === status ? true : false
                            // }
                            onChange={handleChange}
                          />
                          <label className="form-check-label">{""}</label>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* {Object.keys(form).map((columnName, i) => {
                    if (columnName === "Status") {
                      return (
                        <fieldset className="form-group" key={i}>
                          <div className="row">
                            <label className="col-form-label col-sm-3 pt-0">
                              {columnName}
                            </label>
                            <div className="col-sm-9">
                            </div>
                          </div>
                        </fieldset>
                      );
                    } else {
                      return (
                        <div className="form-group row" key={i}>
                          <label className="col-sm-3 col-form-label">
                            {columnName}
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name={columnName}
                              value={form[columnName]}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      );
                    }
                  })} */}
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={() => handleModal(false)}>
            Close
          </Button>
          <Button
            variant=""
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreate;

import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import data from "../pages/tableData";

function CustomModal({ largeModal, handleModal, modalInformations }) {
  const { status } = data.profileTable;
  const [form, setForm] = useState({});
  useEffect(() => {
    const merged = modalInformations.columns.reduce((obj, key, index) => {
      if (key !== "Action") {
        return { ...obj, [key]: modalInformations.modalInformations[index] };
      } else {
        return { ...obj };
      }
    }, {});
    setForm(merged);
    return () => {
      setForm({});
    };
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    console.log(JSON.stringify(form));
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

      <Modal className="fade bd-example-modal-lg" show={largeModal} size="lg">
        <Modal.Header>
          <Modal.Title>Modifier la commande</Modal.Title>
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
              <h4 className="card-title">La commande</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  {Object.keys(form).map((columnName, i) => {
                    if (columnName === "Status") {
                      return (
                        <fieldset className="form-group" key={i}>
                          <div className="row">
                            <label className="col-form-label col-sm-3 pt-0">
                              {columnName}
                            </label>
                            <div className="col-sm-9">
                              {status.map((status, i) => (
                                <div className="form-check" key={i}>
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name={columnName}
                                    value={status}
                                    checked={
                                      form[columnName] === status ? true : false
                                    }
                                    onChange={handleChange}
                                  />
                                  <label className="form-check-label">
                                    {status}
                                  </label>
                                </div>
                              ))}

                              {/* <div className="form-check disabled">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gridRadios"
                                  defaultValue="option3"
                                  disabled
                                />
                                <label className="form-check-label">
                                  Third disabled radio
                                </label>
                              </div> */}
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
                  })}

                  {/* <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                  </div> */}

                  {/* <div className="form-group row">
                    <div className="col-sm-3">Checkbox</div>
                    <div className="col-sm-9">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label">
                          Example checkbox
                        </label>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="form-group row">
                    <div className="col-sm-10">
                      <button type="submit" className="btn btn-primary">
                        Sign in
                      </button>
                    </div>
                  </div> */}
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

export default CustomModal;

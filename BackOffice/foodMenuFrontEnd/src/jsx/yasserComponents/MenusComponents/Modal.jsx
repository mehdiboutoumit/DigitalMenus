import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function CustomModal({ isModalOpen, handleModal, modalInformations }) {
  const status = ["OFFLINE", "ONLINE"];
  const { data, columns } = modalInformations;
  const [form, setForm] = useState({});
  useEffect(() => {
    const merged = columns.reduce((obj, curr, index) => {
      console.log(curr);
      if (curr.label !== "Action") {
        console.log(data);
        return {
          ...obj,
          [curr.field]: data[curr.field],
        };
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
    alert(JSON.stringify(form));
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
          <Modal.Title>Modifier le Menu</Modal.Title>
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
                  {columns.map((row, i) => {
                    if (row.label === "Code QR") {
                      return (
                        <fieldset className="form-group" key={i}>
                          <div className="row">
                            <label className="col-form-label col-sm-3 pt-0">
                              {row.label}
                            </label>
                            <div className="col-sm-9">
                              <img
                                src={`${
                                  process.env.PUBLIC_URL
                                }/assets/code_qr/${data[row.field]}`}
                                alt="qr code"
                              />
                            </div>
                            <div className="col-sm-9"></div>
                          </div>
                        </fieldset>
                      );
                    } else if (row.label === "Image") {
                      return (
                        <fieldset className="form-group" key={i}>
                          <div className="row">
                            <label className="col-form-label col-sm-3 pt-0">
                              {row.label}
                            </label>
                            <div className="col-sm-9">
                              <img
                                src={`${process.env.PUBLIC_URL}/assets/card/${
                                  data[row.field]
                                }`}
                                alt="qr code"
                              />
                            </div>
                            <div className="col-sm-9"></div>
                          </div>
                        </fieldset>
                      );
                    } else if (row.label === "Menu ID") {
                      return (
                        <div className="form-group row" key={i}>
                          <label className="col-sm-3 col-form-label">
                            {row.label}
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name={row.field}
                              value={form[row.field]}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      );
                    } else if (row.label === "Name") {
                      return (
                        <div className="form-group row" key={i}>
                          <label className="col-sm-3 col-form-label">
                            {row.label}
                          </label>
                          <div className="col-sm-9">
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name={row.field}
                              value={form[row.field]}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      );
                    } else if (row.label === "Description") {
                      return (
                        <div className="form-group row" key={i}>
                          <label className="col-sm-3 col-form-label">
                            {row.label}
                          </label>
                          <div className="col-sm-9">
                            <textarea
                              type="text"
                              className="form-control"
                              placeholder=""
                              name={row.field}
                              value={form[row.field]}
                              onChange={handleChange}
                              rows="6"
                            />
                          </div>
                        </div>
                      );
                    } else if (row.label === "Status") {
                      return (
                        <div className="form-group" key={i}>
                          <div className="row">
                            <label className="col-form-label col-sm-3 pt-0">
                              {row.label}
                            </label>
                            {/* <div className="col-sm-9">
                            <textarea
                              type="text"
                              className="form-control"
                              placeholder=""
                              name={row.field}
                              value={form[row.field]}
                              onChange={handleChange}
                              rows="6"
                            />
                          </div> */}
                            <div className="col-sm-9 ">
                              {status.map((status, i) => (
                                <div
                                  className="form-check align-items-center"
                                  key={i}
                                >
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name={row.field}
                                    value={status}
                                    checked={
                                      form[row.field] === status ? true : false
                                    }
                                    onChange={handleChange}
                                  />
                                  <label className="form-check-label">
                                    {status}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
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

export default CustomModal;

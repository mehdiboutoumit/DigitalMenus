import React, { useState, useEffect } from "react";


const EditOrder = ({ editOrderData }) => {

    const [table, setTable] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [totalprice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (editOrderData) {
      // Fill the form fields with the old information
      setTable(editOrderData.table || "");
      setStatus(editOrderData.status || "");
      setDate(editOrderData.date || "");
      setTotalPrice(editOrderData.totalprice || 0);
    } else {
      // Reset the form fields
      setTable("");
      setStatus("");
      setDate("");
      setTotalPrice(0);
    }
  }, [editOrderData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Submit", { table, status, date, totalprice });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="table">Table</label>
        <input
          type="text"
          className="form-control"
          id="table"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <input
          type="text"
          className="form-control"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="text"
          className="form-control"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="totalprice">Prix total</label>
        <input
          type="number"
          className="form-control"
          id="totalprice"
          value={totalprice}
          onChange={(e) => setTotalPrice(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {editOrderData ? "Update" : "Create"}
      </button>
    </form>
  );
}

export default EditOrder;
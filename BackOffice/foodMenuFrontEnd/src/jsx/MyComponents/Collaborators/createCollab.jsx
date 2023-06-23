import axios from "axios";
import React, { useState , useEffect } from "react";
import { baseURL } from "../../../api/baseURL";


const CreateCollab = ({ editCollabData }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [notes, setNotes] = useState("");
    const [roles, setRoles] = useState([]);
const fetchRoles = async()=>{
    try {
    
        const res =  await axios.get(`${baseURL}/role/`);
setRoles(res.data.role);      
 
    } catch (error) {
      console.log("Error fetching roles",error);
    }
  }
  useEffect(()=>{
      fetchRoles();
  },[])
  
    useEffect(() => {
      if (editCollabData) {
        // Fill the form fields with the old information
        setName(editCollabData.name || "");
        setPassword(editCollabData.password || "");
        setEmail(editCollabData.email || "");
        setRole(editCollabData.role || "");
        setNotes(editCollabData.notes || "");
      } else {
        // Reset the form fields
        setName("");
        setPassword("");
        setEmail("");
        setRole("");
        setNotes("");
      }
    }, [editCollabData]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      console.log("Submit", { name, password, email, role, notes });
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.role}>
                {role.role}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            className="form-control"
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {editCollabData ? "Update" : "Create"}
        </button>
      </form>
    );
  };

export default CreateCollab;

import axios from "axios";
import React, { useState , useEffect } from "react";
import { baseURL } from "../../../api/baseURL";


const CreateCollab = ({onClose,  editCollabData , restaurantId }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(1);
    const [roles, setRoles] = useState([]);

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleConfirmPasswordChange = (e) => {
       setConfirmPassword(e.target.value);}

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
       
      } else {
        // Reset the form fields
        setName("");
        setPassword("");
        setEmail("");
        setRole("");
       
      }
    }, [editCollabData]);

    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        const res = axios.post(`${baseURL}/user/add`, {
          name, password, email, id_role : role, id_restaurant : restaurantId, accessType : "user"
        });
        onClose();
        
      } catch (error) {
        
      }
      // Handle form submission
      console.log("Submit", { name, password, email, role });
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

        {!editCollabData && <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>}
        
        {!editCollabData && <div className="form-group">
              <label className="mb-1">
                <label>Confirm Password</label>
              </label>
              <input
                type="password"
                className={`form-control ${
                    confirmPassword === "" ? "" : password === confirmPassword ? "border-success" : "border-danger"
                  }`}                              name="confirmPassword"
                onChange={handleConfirmPasswordChange}
              />
              </div>}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            value={role}
            
            onChange={(e) => setRole(parseInt(e.target.value))}
          >

            {roles.map((role) => (
              <option key={role.id} value={role.id} >
                {role.role}
              </option>
            ))}
          </select>
        </div>
        
        
          {editCollabData ?  <button type="submit" className="btn btn-primary" disabled={ role ===""}>
              Modifier </button> : <button type="submit" className="btn btn-primary" disabled={name.length < 4 || password !== confirmPassword || password < 4 || role ===""}>
                              Ajouter
                            </button>}
       
      </form>
    );
  };

export default CreateCollab;

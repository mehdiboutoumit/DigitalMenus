import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../../api/baseURL';

function CreateAccount({onClose , editAccountData}) {

  const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [accessType, setAccessType] = useState(1);
    const accessTypes = ["superadmin" , "admin" , "user"]

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleConfirmPasswordChange = (e) => {
       setConfirmPassword(e.target.value);}
       useEffect(() => {
        if (editAccountData) {
          setName(editAccountData.name || null);
          setPassword(editAccountData.password || null);
          setEmail(editAccountData.email || null);
          setAccessType(editAccountData.accessType || null);
         
        } else {
          setName("");
          setPassword("");
          setEmail("");
          setAccessType("");
         
        }
      }, [editAccountData]);

      const handleSubmit = (e) => {
        e.preventDefault();
        if(editAccountData){
          try {
            const res = axios.put(`${baseURL}/user/${editAccountData.id}`, {
              name, password, email, accessType
            });
            onClose();
      
        
      } catch (error) {
        console.log(error);
      }
        }
        else{
            try {
              const role = (accessType === "admin" || accessType === "superadmin") ? 0 : 1;
              const res = axios.post(`${baseURL}/user/add`, {
                name, password, email, accessType , id_role : role
              });
              onClose();
        
          
        } catch (error) {
          console.log(error);
        }
      
        // Handle form submission
        console.log("Submit", { name, password, email, accessType });
      };
    }
    
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

        {!editAccountData && <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>}
        {editAccountData && <div className="form-group">
          <label htmlFor="password">Nouvelle password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>}
        
        { <div className="form-group">
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
          <label htmlFor="accessType">Type d'acces</label>
          <select
            className="form-control"
            id="accessType"
            value={accessType}
            
            onChange={(e) => setAccessType((e.target.value))}
          >

            {accessTypes.map((accessType, index) => (
              <option key={index} value={accessType} >
                {accessType}
              </option>
            ))}
          </select>
        </div>
        
        
          {editAccountData ?  <button type="submit" className="btn btn-primary" disabled={ accessType ===""}>
              Modifier </button> : <button type="submit" className="btn btn-primary" disabled={name.length < 4 || password !== confirmPassword || password < 4 || accessType ===""}>
                              Ajouter
                            </button>}
       
      </form>
  )
}

export default CreateAccount
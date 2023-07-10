import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { baseURL } from "../../../api/baseURL";

const Registration = () => {
   const [registrationData, setRegistrationData] = useState({});
   const history = useHistory();

   const [confirmPassword, setConfirmPassword] = useState("");

   const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };

   const [selectedRole, setSelectedRole] = useState("admin");


   const handleBlur = (e) => {
      const newRegistrationData = { ...registrationData };
      newRegistrationData[e.target.name] = e.target.value;
      setRegistrationData(newRegistrationData);
   };
   const submitHandler = async(e) => {
      e.preventDefault();
      try {
         const res = await axios.post(`${baseURL}/admin/register`,registrationData);
         history.push(`/login`); 
               
      } catch (error) {
         console.log(error);
      }
      
   };
   return (
      <div className="row justify-content-center  align-items-center h-80">
         <div className="col-md-6">
            <div className="authincation-content">
               <div className="row no-gutters">
                  <div className="col-xl-12">
                     <div className="auth-form">
                        <div className="text-center mb-3">
                          <h4 className="text-center mb-4">Sign up your account</h4>
                        </div>
                        
                        <form
                           action=""
                           onSubmit={submitHandler}
                        >
                           <div className="form-group">
                              <label className="mb-1 "> <strong>Username</strong> </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 placeholder="username"
                                 name="name"
                                 onChange={handleBlur}
                              />
                           </div>
                           <div className="form-group">
                              <label className="mb-1 ">   <strong>Email</strong>  </label>
                              <input  type="email" className="form-control"  placeholder="hello@example.com"  name="email"  onChange={handleBlur}   />
                           </div>
                           <div className="form-group">
                              <label className="mb-1 ">   <strong>Password</strong>  </label>
                              <input type="password" className="form-control" name="password"  onChange={handleBlur}  />
                           </div>
                           <div className="form-group">
                           <label className="mb-1">
                              <strong>Confirm Password</strong>
                           </label>
                           <input
                              type="password"
                              className={`form-control ${
                                 confirmPassword === "" ? "" : registrationData.password === confirmPassword ? "border-success" : "border-danger"
                               }`}                              name="confirmPassword"
                              onChange={handleConfirmPasswordChange}
                           />
                           </div>
                           <div className="form-group">
                           <label className="mb-1">
                              <strong>Role</strong>
                           </label>
                           <div className="form-check">
                              <input
                                 type="radio"
                                 id="admin"
                                 name="role"
                                 value="admin"
                                 className="form-check-input"
                                 checked={selectedRole === "admin"}
                                 onChange={handleBlur}
                              />
                              <label htmlFor="admin" className="form-check-label">
                                 Admin
                              </label>
                           </div>

                           <div className="form-check">
                              <input
                                 type="radio"
                                 id="superadmin"
                                 name="role"
                                 value="superadmin"
                                 className="form-check-input"
                                 checked={selectedRole === "superadmin"}
                                 onChange={handleBlur}
                              />
                              <label htmlFor="superadmin" className="form-check-label">
                                 Superadmin
                              </label>
                           </div>
                           </div>
                           <button
                           type="submit"
                           className="btn btn-primary btn-block"
                           disabled={registrationData.password !== confirmPassword}
                           >
                           Sign me up
                           </button>
                         
                        </form>
                        <div className="new-account mt-3">
                           <p className="">
                              Already have an account?{" "}
                              <Link className="text-primary" to="/login">
                                 Sign in
                              </Link>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Registration;

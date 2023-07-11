import Cookies from 'js-cookie';
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import axios from "axios";
import { baseURL } from "../../../api/baseURL";
const LOGIN_URL = "/api/admin/login";


const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigation = useHistory();
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr ] = useState("");
    const handleChange = (e) => {
    const newLoginData = { ...loginData };
    newLoginData[e.target.name] = e.target.value;
    setLoginData(newLoginData);

    console.log(Cookies.get('role'));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseURL}/user/login`,
        JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      const json = response?.data;
      
      // Loop over the JSON object
      for (const propertyName in json) {
        if (Object.hasOwnProperty.call(json, propertyName)) {
          const propertyValue = json[propertyName];
          
          // Set the cookie using the property name as the cookie name and the value as the cookie value
          Cookies.set(propertyName, propertyValue);
        }
      }

      
      // const accessToken = response?.data?.accessToken;
      // const role = response?.data?.role;
      // const name = response?.data?.user;
      // const accessType = response?.data?.accessType;
      // const userId = response?.data?.id;
     // Cookies.remove('role');
      // Cookies.set('role', role);
      // Cookies.set('accessToken', accessToken);
      // Cookies.set('user', name);
      // Cookies.set('accessType', accessType);
      // Cookies.set('userId', userId);

      // setAuth({
      //   email: loginData.email,
      //   password: loginData.password,
      //   accessToken,
      // });
      // console.log("accesss ",accessToken)
      
      navigation.push("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (!err?.response) {
        console.log("No Server Response");
        setErr("Probleme de serveur")
      } else if (err.response.status === 400) {
        setErr("Email ou password non rempli")
        console.log("Missing Username or Password");
      } else if (err.response.status === 401) {
        setErr("Non autorisé")
        console.log("Unauthorized");
      } else {
        setErr("Echec")
        console.log("LoginFailed");
      }
    }
    setLoading(false);
  };
  return (
    <div className="row justify-content-center h-100 align-items-center h-80">
      <div className="col-md-6">
        <div className="authincation-content">
          <div className="row no-gutters">
            <div className="col-xl-12">
              <div className="auth-form">
                <h4 className="text-center mb-4 "> Sign in your account </h4>
                <form action="" onSubmit={submitHandler}>
                  <div className="form-group">
                    {" "}
                    <label className="mb-1 ">
                      {" "}
                      <strong>Email</strong>{" "}
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="hello@example.com"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="mb-1 ">
                      {" "}
                      <strong>Password</strong>{" "}
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-row d-flex justify-content-between mt-4 mb-2">
                    <div className="form-group">
                      <div className="custom-control custom-checkbox ml-1 ">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="basic_checkbox_1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="basic_checkbox_1"
                        >
                          {" "}
                          Remember my preference{" "}
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <Link className="" to="/forgotpassword">
                        {" "}
                        Forgot Password?{" "}
                      </Link>
                    </div>
                  </div>
                 {err && <div  className="alert alert-danger d-flex justify-content-center mt-4 mb-4">
                    {err}
                  </div>}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={() => submitHandler}
                    >
                      {!loading ? "Sign Me In" : "Loading..."}
                    </button>
                  </div>
                </form>
                <div className="new-account mt-3">
                  <p className="">
                    {" "}
                    Don't have an account?{" "}
                    <Link className="text-primary" to="/register">
                      {" "}
                      Sign up{" "}
                    </Link>{" "}
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

export default Login;

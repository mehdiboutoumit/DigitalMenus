import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
const LOGIN_URL = "/api/v1/admin/login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigation = useHistory();
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleBlur = (e) => {
    const newLoginData = { ...loginData };
    newLoginData[e.target.name] = e.target.value;
    setLoginData(newLoginData);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      setLoading(true);
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accesToken = response?.data?.accesToken;
      console.log(response.accesToken);
      console.log(JSON.stringify(response.data));
      setAuth({
        email: loginData.email,
        password: loginData.password,
        accesToken,
      });
      navigation.push("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response.status === 400) {
        console.log("Missing Username or Password");
      } else if (err.response.status === 401) {
        console.log("Unauthorized");
      } else {
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
                      onChange={handleBlur}
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
                      onChange={handleBlur}
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
                      <Link className="" to="/page-forgot-password">
                        {" "}
                        Forgot Password?{" "}
                      </Link>
                    </div>
                  </div>
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
                    <Link className="text-primary" to="/page-register">
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

import React, { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { getUrl } from "../components/utils";
import GoogleAuthButton from "../components/GoogleAuthButton";

let url = getUrl(true)

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
  });

  const registerFormDataHandler = (e) => {
    e.preventDefault();

    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (registerFormData.email === "" || registerFormData.password === "") {
      return alert("You must provide all values");
    }

    setLoading(true);

    const response = await fetch(
      url + '/login',
      {
        method: "POST",
        body: JSON.stringify(registerFormData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonData = await response.json();

    if (!response.ok) {
      alert("there was an error ");
      setLoading(false);
    }
    if (response.ok) {
      setRegisterFormData({
        email: "",
        password: "",
      });
      dispatch({ type: "LOGIN", payload: jsonData });
      localStorage.setItem("userToken", JSON.stringify(jsonData));
      setLoading(false);

    }
  };

  return (
    <>
      <h2 className="form-text">Register first to use the app</h2>
      <form className="register" onSubmit={(e) => e.preventDefault()}>
        <h3>Login Here</h3>

        <div>
          <label>Email :</label>
          <input
            value={registerFormData.email}
            onChange={registerFormDataHandler}
            name="email"
            type="email"
            placeholder="enter your Email"
            className="form-input"
          ></input>
        </div>
        <div>
          <label>Password :</label>
          <input
            value={registerFormData.password}
            onChange={registerFormDataHandler}
            type="password"
            placeholder="enter your password"
            className="form-input"
            name="password"
          ></input>
        </div>
        {loading ? (
          <button className="btn loading-btn" onClick={submitFormHandler}>
            submiting...
          </button>
        ) : (
          <button className="btn" onClick={submitFormHandler}>
            Log in
          </button>

        )}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto'
        }}>
          <GoogleAuthButton />
        </div>
      </form>
    </>
  );
};

export default Login;

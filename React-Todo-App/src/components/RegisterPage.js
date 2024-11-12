import React, { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { getUrl } from "./utils";
import GoogleAuthButton from "./GoogleAuthButton";

let url = getUrl(true)


const RegisterPage = () => {
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
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
    if (
      registerFormData.name === "" ||
      registerFormData.email === "" ||
      registerFormData.password === ""
    ) {
      return alert("You must provide all values");
    }

    setLoading(true);

    const response = await fetch(
      url + '/register',
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
        name: "",
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
      <h2 className="form-text">Register First to use the App</h2>

      <form className="register" onSubmit={submitFormHandler}>
        <h3>Register Here</h3>
        <div>
          <label>Name :</label>
          <input
            value={registerFormData.name}
            onChange={registerFormDataHandler}
            name="name"
            type="text"
            placeholder="enter your name"
            className="form-input"
          ></input>
        </div>
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

export default RegisterPage;

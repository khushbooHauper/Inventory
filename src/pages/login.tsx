import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { validationSchema } from "../validation/login";
import { toast } from "react-toastify";
import "../assets/styles/login.scss";
import getUsers from "../utils/getUsers";

const API_URL = process.env.PUBLIC_URL + "/api-response/login.json";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { login } = useContext(AuthContext);
  const Toggle = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  const handleSignIn = async (email:string, password:string) => {
    try {
      const payload = {
        email: email,
        password: password,
      };

      // post request comes here with payload above
      const response = await getUsers(API_URL);
      const isSuccess = response.data.status;

      if (isSuccess) {
        login(email, password);
        // toast.success("Login successful!");
      } else {
        toast.error("Login failed. Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSignIn(values.email, values.password);
    },
  });

  return (
    <div className="login-form">
      
      <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="email"
          />

          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="Password"
            />
            <i
              className={`fa ${showPass ? "fa-eye-slash" : "fa-eye"} eye-icon`}
              onClick={Toggle}
            ></i>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>
        <button type="submit" disabled={!formik.isValid}  className={`login-button ${formik.isValid ? "" : "disabled"}`}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState, useContext } from "react";
import "../assets/styles/login.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useFormik } from "formik";
import { validationSchema } from "../validation/login";
const API_URL = process.env.PUBLIC_URL + "/api-response/login.json";

function Login() {
  const [showPass, setShowPass] = useState(false);
  const { login } = useContext(AuthContext);
  const Toggle = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };
 

  const handleSignIn: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    const isFormValid = formik.values.email && formik.values.password; // Checking if all fields are filled

    if (isFormValid) {
      try {
        const payload = {
          email: formik.values.email,
          password: formik.values.password,
        };

        const response = await axios.get(API_URL);
        const isSuccess = response.data.status;

        if (isSuccess) {
          login(formik.values.email, formik.values.password);
          // toast.success("Login successful!");
        } else {
          toast.error("Login failed. Invalid credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("An error occurred during login.");
      }
    } else {
      toast.error("Please fill all the required fields.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });
  return (
    <div className="login-form">
      <form>
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
        <button type="button" onClick={handleSignIn} disabled={!formik.isValid}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

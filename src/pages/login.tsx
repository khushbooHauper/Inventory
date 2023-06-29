import React, { useState, useContext } from "react";
import "../assets/styles/login.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import { validationSchema } from "../validation/login";
const API_URL = process.env.PUBLIC_URL + "/api-response/login.json";

function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const Toggle = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };
  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };

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
    <div className="container">
      <div className="form-box">
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
          </h4>
          <div className="image"></div>
        </div>
        <div className="body-form">
          <form onSubmit={formik.handleSubmit}>
            <div className="input-group mb-3">
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
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="error-message">{formik.errors.email}</div>
            )}
            <div className="input-group mb-3">
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
                className={`fa ${
                  showPass ? "fa-eye-slash" : "fa-eye"
                } eye-icon`}
                onClick={Toggle}
              ></i>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={handleSignIn}
              disabled={!formik.isValid}
            >
              LOGIN
            </button>
            <div className="message">
              <div>
                <input type="checkbox" /> Remember ME
              </div>
              <div>
                <a href="#">Forgot your password</a>
              </div>
            </div>
          </form>
          <div className="social">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-google"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

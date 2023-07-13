import React,{useContext} from "react";
import "./App.scss";
import Dashboard from "./pages/dashboard";
import { AuthContext } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";


function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      {isLoggedIn ? <Dashboard/> : <Login/>}
      <ToastContainer />
    </div>
  );
}

export default App;

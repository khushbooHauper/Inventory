import React,{useContext} from "react";
import "./App.scss";
import Dashboard from "./pages/dashboard";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


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

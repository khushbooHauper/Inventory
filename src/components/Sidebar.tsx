import React ,{useContext,useState,useEffect} from 'react'
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/styles/sidebar.scss";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
const API_URL = process.env.PUBLIC_URL + "/api-response/login.json";

const Sidebar = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const { isLoggedIn,logout } = useContext(AuthContext);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const responseData = response.data.data;
        if (isLoggedIn) {
          setUserName(responseData.username);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isLoggedIn]);
  return (
    <div className="sidebar">
      
      <Nav defaultActiveKey="/" className="flex-column ">
        <Nav.Link as={Link} to="/" className="side-menu-link">
          <i className="fa fa-home" aria-hidden="true"></i>
          <span>Home</span>
        </Nav.Link>
        
        <Nav.Link
          as={Link}
          to="#"
          className="side-menu-link"
          onClick={toggleSubmenu}
        >
         
          <i className="fas fa-shopping-bag" aria-hidden="true"></i>
          <span>Products</span>
          <i
            className={`fas ${showSubmenu ? "fa-caret-down" : "fa-caret-right"} arrow`}
            aria-hidden="true"
          ></i>
        </Nav.Link>
        {showSubmenu && (
          <Nav className="flex-column sub-menu">
            <Nav.Link as={Link} to="/add-product" className="sub-menu-link">
              Add product
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="sub-menu-link">
              Product List
            </Nav.Link>
            
          </Nav>
        )}
      </Nav>
      <div className="dropdown">
      <a href="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
        <strong>{userName}</strong>
      </a>
      <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a className="dropdown-item" href="#">New project...</a></li>
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item" to='/' onClick={logout}>Sign out</Link></li>
      </ul>
    </div>
    </div>
  );
};

export default Sidebar;

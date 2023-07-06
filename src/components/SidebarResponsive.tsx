import React, { useContext, useEffect, useState } from 'react'
import '../assets/styles/siderespo.scss'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const API_URL = process.env.PUBLIC_URL + "/api-response/login.json";



function SidebarResponsive() {
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
    <div>
      <div className="s-layout">
{/* <!-- Sidebar --> */}
<div className="s-layout__sidebar">
  <a className="s-sidebar__trigger" href="#0">
     <i className="fa fa-bars"></i>
  </a>

  <nav className="s-sidebar__nav">
     <ul>
        <li>
           <Link className="s-sidebar__nav-link" to="/">
              <i className="fa fa-home"></i><em>Home</em>
           </Link>
        </li>
        <li>
           <a className="s-sidebar__nav-link" href="#0">
             <i className="fa fa-user"></i><em>My Profile</em>
           </a>
        </li>
        <li  onClick={toggleSubmenu}>
           <a className="s-sidebar__nav-link" href="#0">
             <i className="fa fa-user"></i><em>Products</em>
           </a>
        </li>
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
        <li>
           <a className="s-sidebar__nav-link" href="#0">
              <i className="fa fa-camera"></i><em>Camera</em>
           </a>
        </li>
     </ul>
  </nav>
</div>

<div className="dropdown">
      <Link to="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
        <strong>{userName}</strong>
      </Link>
      <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        {/* <li><Link className="dropdown-item"to="#">New project...</Link></li>
        <li><Link className="dropdown-item" to="#">Settings</Link></li>
        <li><Link className="dropdown-item" to="#">Profile</Link></li>
        <li><hr className="dropdown-divider"/></li> */}
        <li><Link className="dropdown-item" to='/' onClick={logout}>Sign out</Link></li>
      </ul>
    </div>
</div>

    </div>
  )
}

export default SidebarResponsive

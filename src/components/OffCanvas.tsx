import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
const API_URL = process.env.PUBLIC_URL + "/api-response/login.json";

function OffCanvas() {
  const expand = false; // Set the desired expand value
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const { isLoggedIn,logout } = useContext(AuthContext);
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
  const handleNavItemClick = () => {
    setShowOffcanvas(false);
  };
  return (
    <>
      <Navbar expand={expand} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#" className="m-2">
            Inventory
          </Navbar.Brand>
          <Navbar.Toggle
            className="m-2"
            aria-controls="offcanvasNavbar"
            onClick={() => setShowOffcanvas(true)}
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Inventory
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  as={Link}
                  to="/"
                  className="side-menu-link"
                  onClick={handleNavItemClick}
                >
                  <i className="fa fa-home" aria-hidden="true"></i>
                  <span>Home</span>
                </Nav.Link>
                <NavDropdown
                  title={
                    <>
                      <i className="fa fa-shopping-bag" aria-hidden="true"></i>{" "}
                      Products
                    </>
                  }
                  id="offcanvasNavbarDropdown"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/add-product"
                    onClick={handleNavItemClick}
                  >
                    Add Product
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Link}
                    to="/products"
                    onClick={handleNavItemClick}
                  >
                    Product List
                  </NavDropdown.Item>
                </NavDropdown>
                
              </Nav>
              <div className="dropdown">
      <Link to="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
        <strong>{userName}</strong>
      </Link>
      <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><Link className="dropdown-item"to="#">New project...</Link></li>
        <li><Link className="dropdown-item" to="#">Settings</Link></li>
        <li><Link className="dropdown-item" to="#">Profile</Link></li>
        <li><hr className="dropdown-divider"/></li>
        <li><Link className="dropdown-item" to='/' onClick={logout}>Sign out</Link></li>
      </ul>
    </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffCanvas;

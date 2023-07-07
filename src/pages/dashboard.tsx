import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Home from "./Home";
import Login from "./login";
import Product from "./product";
import AddProduct from "../components/AddProduct";
import OffCanvas from "../components/OffCanvas";

function Dashboard() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobileView(windowWidth < 768);
      setIsTabletView(windowWidth >= 768 && windowWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Container fluid style={{ padding: "0px" }}>
        <Row>
          {isMobileView || isTabletView ? (
            <Col sm={12} xs={12} style={{ padding: "0px" }}>
              <OffCanvas />
            </Col>
          ) : (
            <Col sm={3} xs={3}>
              <Sidebar />
            </Col>
          )}
          <Col
            sm={isMobileView || isTabletView ? 12 : 9}
            xs={isMobileView || isTabletView ? 12 : 9}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/products" element={<Product />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/add-product/:id" element={<AddProduct />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;

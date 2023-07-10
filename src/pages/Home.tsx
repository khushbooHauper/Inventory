import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import "../assets/styles/home.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loadProducts } from "../redux/features/productSlice";
const Home = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const totalWeight = useSelector(
    (state: RootState) => state.product.totalWeight
  );
  const totalProducts = useSelector(
    (state: RootState) => state.product.totalProducts
  );
  const totalInventoryValue = useSelector(
    (state: RootState) => state.product.totalInventoryValue
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch an action to load the products if the state is not already populated
    if (!totalProducts) {
      dispatch(loadProducts(products));
    }
  }, [dispatch, totalProducts]);
  return (
    <>
    <div className="home">
      <Card className="card">
        <Card.Body>
          <Card.Title>Total Products</Card.Title>
          <Card.Text>{totalProducts}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="card">
        <Card.Body>
          <Card.Title>Total Weights</Card.Title>
          <Card.Text>{totalWeight} kg</Card.Text>
        </Card.Body>
      </Card>

      <Card className="card">
        <Card.Body>
          <Card.Title>Total Inventory Value</Card.Title>
          <Card.Text>INR {totalInventoryValue}</Card.Text>
        </Card.Body>
      </Card>
    </div>
    <div className="middle-section">
    <Card className="feature-1">
      <Card.Header>PRODUCT DETAILS</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        
      </Card.Body>
    </Card>
    <Card className="feature-2">
      <Card.Header>TOP SELLING ITEMS</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        
      </Card.Body>
    </Card>
    </div>
    </>
  );
};

export default Home;

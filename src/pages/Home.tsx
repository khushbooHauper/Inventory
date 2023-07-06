import React from "react";
import { Card } from "react-bootstrap";
import "../assets/styles/home.scss";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const Home = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const totalWeight = products.reduce((acc, product) => {
    if (product.weight !== null) {
      return acc + +product.weight;
    }
    return acc;
  }, 0);

  

  const totalProducts = products.length;
  const totalInventoryValue = products.reduce((acc, product) => {
    if (product.weight !== null) {
      return acc + (product.price || 0) * (product.quantity || 0);
    }
    return acc;
  }, 0);

  return (
    <div className="home">
      <Card className="card">
        <Card.Body>
          <Card.Title>Total Products</Card.Title>
          <Card.Text>{totalProducts}</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Total Weights</Card.Title>
          <Card.Text>{totalWeight} kg</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Total Inventory Value</Card.Title>
          <Card.Text>INR {totalInventoryValue}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;

import React from "react";
import { Card } from "react-bootstrap";
import "../assets/styles/home.scss";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
const Home = () => {
  const totalWeight = useSelector(
    (state: RootState) => state.product.totalWeight
  );
  const totalProducts = useSelector(
    (state: RootState) => state.product.totalProducts
  );
  const totalInventoryValue = useSelector(
    (state: RootState) => state.product.totalInventoryValue
  );

  return (
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
  );
};

export default Home;

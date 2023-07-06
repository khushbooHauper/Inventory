import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { InventoryContext } from '../context/InventoryContext';
import '../assets/styles/home.scss';
const Home1 = () => {
  const { products } = useContext(InventoryContext);

  // Calculate the total products
  const totalProducts = products.length;

  // Calculate the total weights
  const totalWeights = products.reduce((acc, product) => acc + product.weight, 0);

  // Calculate the total inventory value
  const totalInventoryValue = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div  className='home'>
     

      <Card className='card'>
        <Card.Body>
          <Card.Title>Total Products</Card.Title>
          <Card.Text>{totalProducts}</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Total Weights</Card.Title>
          <Card.Text>{totalWeights} kg</Card.Text>
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

export default Home1;

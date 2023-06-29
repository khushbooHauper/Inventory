import React ,{useContext} from 'react'
import { Container,Row ,Col} from 'react-bootstrap';
import { Router, Link ,Routes,Route} from "react-router-dom";
import Sidebar from '../components/Sidebar';
import Home from './Home';
import Login from './login';
import Product from './product';
import AddProduct from '../components/AddProduct';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
   
      <Container fluid>
       
        <Row>
          <Col sm={3} style={{paddingLeft:0}}>
            <Sidebar />
          </Col>
          <Col sm={9}>
           <Routes>
              <Route  path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/products" element={<Product/>} />
              <Route path="/add-product" element={<AddProduct/>} />
              <Route path="/add-product/:id" element={<AddProduct/>} />
              </Routes>
          </Col>
        </Row>
      </Container>
   
  )
}

export default Dashboard

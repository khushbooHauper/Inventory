import React from 'react'
import TableProduct from '../components/Table'
import Button from 'react-bootstrap/Button';
import {useNavigate } from 'react-router-dom';
import '../assets/styles/product.scss';

function Product() {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/add-product');
  };
  return (
    <div className='product'>
      <div className='top-box'>
       <div>
       <i className="fa fa-search myicon-search" aria-hidden="true"></i>
       <input className='search' placeholder='search product...'/>
        </div> 
      <Button variant="dark" onClick={handleAddProduct}>
        Add New Product
      </Button>
      </div>
      <div className='table-box'>
      <TableProduct/>
      </div>
        
     
    </div>
  )
}

export default Product

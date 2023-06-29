import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import '../assets/styles/table.scss';
import { RootState } from '../redux/store';
import { removeProduct ,loadProducts, Product, updateProduct} from '../redux/features/productSlice';
import { Link } from 'react-router-dom';

function TableProduct() {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const handleRemoveProduct = (productId: number) => {
    dispatch(removeProduct(productId));
  };
  
  return (
    <Table  bordered hover className='table'>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Name</th>
          <th>Price</th>
          <th>Weight</th>
          <th>Status</th>
          <th>Action</th>
          
        </tr>
      </thead>
      <tbody>
        {products.map((p)=>(
           <tr key={p.id}>
           <td>{p.sku}</td>
           <td>{p.name}</td>
           <td>{p.price}</td>
           <td>{p.weight}</td>
           <td>{p.status}</td>
           <td > <Link to={`/add-product/${p.id}`}>
        <i className="fa fa-edit" aria-hidden="true"></i>
      </Link>
      <i onClick={()=>handleRemoveProduct(p.id)} className="fa fa-trash" aria-hidden="true"></i></td>
           
         </tr>
        ))}
       
        
        
      </tbody>
    </Table>
  );
}

export default TableProduct;
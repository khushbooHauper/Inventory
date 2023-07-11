import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../assets/styles/table.scss";
import { RootState } from "../redux/store";
import {
  removeProduct,
  loadProducts,
  updateProduct,
} from "../redux/features/productSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useDelete from "../hooks/useDelete";
import Confirm from "../modals/ConfirmDelete";
import { Badge } from "react-bootstrap";
import ConfirmStatus from "../modals/ConfirmStatus";
import useStatus from "../hooks/useStatus";
import ViewProduct from "../modals/ViewProduct";
import { Pagination } from "react-bootstrap";
import { TableProductProps } from "../types/table";


const TableProduct: React.FC<TableProductProps> = ({ searchQuery }) => {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(undefined);

  // Reset currentPage when searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  
  useEffect(() => {
    dispatch(loadProducts(products));
  }, [dispatch]);

  // Filter the products based on the search query
  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return productName.includes(query);
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to display per page

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  // Calculate start and end index for displayed items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleOpenView = (product: any) => {
    setShowView(true);
    setSelectedProduct(product);
  };

  const handleCloseView = () => {
    setShowView(false);
    setSelectedProduct(undefined);
  };

  const handleShow = () => setShow(true);
  // const handleclose = () => setShow(false);


  const handleRemoveProduct = async (productId: number): Promise<void> => {
    dispatch(removeProduct(productId));
    dispatch(loadProducts(products));
  };

  const AfterDelete = (isSuccess: boolean, resultDelete: any) => {
    if (isSuccess) {
      toast.success("Product deleted successfully");
    } else {
      toast.error("Error deleting product");
    }
  };

  const {
    deleteById,
    deleteFinally,
    showConfirmationDelete,
    handleCancelDelete,
    idToDelete,
    loadingDelete,
  } = useDelete(handleRemoveProduct, true, AfterDelete);

  const onDelete = (id: number) => {
    deleteById(id);
    handleShow();
    setCurrentPage(1);
  };

  const toggleStatus = (itemId: number) => {
    // Find the item in the products array with the matching ID
    const item = displayedProducts.find((p) => p.id === itemId);

    // Check if the item is found and has a valid status
    if (item && item.status) {
      const newStatus = item.status === "active" ? "inactive" : "active";
      const updatedProduct = { ...item, status: newStatus };

      // Dispatch an action to update the product with the new status
      dispatch(updateProduct(updatedProduct));
    }
  };

  const {
    statusById,
    statusFinally,
    showConfirmationStatus,
    handleCancelStatus,
    idToStatus,
    loadingStatus,
   
  } = useStatus(toggleStatus, true);

  const handleStatus = (id: number) => {
    statusById(id);
    handleShow();
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="container">
          <table className="rwd-table">
            <tbody>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Price</th>
                <th>Status</th>
                <th>CreatedAt</th>
                <th>Actions</th>
              </tr>
              {displayedProducts.map((p, index) => (
                <tr key={`${p.id}-${index}`}>
                 
                 <td data-th="Image">
                  {p.selectedImages[0] && typeof p.selectedImages[0] === 'string' && (
                    <img
                      src={p.selectedImages[0]}
                      alt="Product Images"
                      className="image-table-preview"
                      
                    />
                  )}
                </td>
                  <td data-th="Name">
                    {p.name.length > 30 ? (
                      <span title={p.name}>{p.name.substring(0, 10)}</span>
                    ) : (
                      p.name
                    )}
                  </td>
                  <td data-th="Category">{p.category.slice(0,10)}</td>
                  <td data-th="SubCategory">{p.subcategory.slice(0,10)}</td>
                  <td data-th="Price">{p.price}</td>
                  <td data-th="Status">
                    <Badge
                      bg={p.status === "active" ? "success" : "danger"}
                      className="fixed-badge-width"
                    >
                      {p.status}
                    </Badge>
                  </td>
                  <td data-th="CreatedAt">{p.createdAt.slice(0,10)}</td>
                  <td data-th="Actions" className="actions">
                    <div
                      className={`dropdown dropdown-container 
                      }`}
                      
                    >
                      <Link
                        to="#"
                        className="d-flex align-items-center text-dark text-decoration-none justify-content-center"
                        id="dropdownUser1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                       <span style={{fontSize:'12px'}}>Actions</span> {" "}<i className="fa fa-angle-down"></i>
                      </Link>
                      <ul
                        className="dropdown-menu dropdown-menu-dark text-small shadow"
                        aria-labelledby="dropdownUser1"
                       
                      >
                        <li>
                          <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleOpenView(p)}
                            
                          >
                            View
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to={`/add-product/${p.id}`}
                          >
                            Edit
                          </Link>
                        </li>
                        <li
                          className="dropdown-item cursor"
                          onClick={() => onDelete(p.id)}
                        >
                          Delete
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="#"
                            onClick={() => handleStatus(p.id)}
                          >
                            Status
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}

              {showConfirmationDelete && idToDelete !== null && (
                <Confirm
                  onClick={() => deleteFinally(idToDelete)}
                  handleCancel={handleCancelDelete}
                  show={show}
                  disabled={loadingDelete}
                />
              )}
              {showConfirmationStatus && idToStatus !== undefined && (
                <ConfirmStatus
                  onClick={() => statusFinally(idToStatus)}
                  handleCancel={handleCancelStatus}
                  show={show}
                  disabled={loadingStatus}
                />
              )}
              {showView && selectedProduct !== undefined && (
                <ViewProduct
                  show={showView}
                  close={handleCloseView}
                  product={selectedProduct}
                />
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-product">
          <h5>No Products Found</h5>
        </div>
      )}

      {products.length > 0 && (
        <Pagination className="pagination">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </>
  );
};

export default TableProduct;

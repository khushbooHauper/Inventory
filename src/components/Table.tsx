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
import useStatusToggle from "../hooks/useStatus";
import ConfirmStatus from "../modals/ConfirmStatus";
import useStatus from "../hooks/useStatus";
import ViewProduct from "../modals/ViewProduct";

function TableProduct() {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(undefined);

  const handleOpenView = (product:any) => {
    setShowView(true);
    setSelectedProduct(product);
    
  };

  const handleCloseView = () => {
    setShowView(false);
    setSelectedProduct(undefined);
  };
 
 
  const handleShow = () => setShow(true);
  const handleclose = () => setShow(false);
  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const handleRemoveProduct = async (productId: number): Promise<void> => {
    dispatch(removeProduct(productId));
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
  };

  const toggleStatus = (itemId: number) => {
    // Find the item in the products array with the matching ID
    const item = products.find((p) => p.id === itemId);

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
    resultStatus,
    idToStatus,
    loadingStatus,
    errorStatus,
    isSuccessStatus,
    setResultStatus,
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
                <th>SKU</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              {products.map((p) => (
                <tr key={p.id}>
                  <td data-th="SKU">{p.sku}</td>
                  <td data-th="Product Name">{p.name}</td>
                  <td data-th="Price">{p.price}</td>
                  <td data-th="Weight">{p.weight}</td>
                  <td data-th="Status">
                    <Badge bg={p.status === "active" ? "success" : "danger"}>
                      {p.status}
                    </Badge>
                  </td>

                  <td data-th="Actions">
                    <div
                      className={`dropdown dropdown-container ${
                        products.length < 2 ? "single-row" : ""
                      }`}
                    >
                      <Link
                        to="#"
                        className="d-flex align-items-center text-dark text-decoration-none justify-content-center"
                        id="dropdownUser1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-three-dots-vertical"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                      </Link>
                      <ul
                        className="dropdown-menu dropdown-menu-dark text-small shadow"
                        aria-labelledby="dropdownUser1"
                      >
                        <li>
                          <Link className="dropdown-item" to="#" onClick={() => handleOpenView(p)}>
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
              {showView  && selectedProduct !== undefined && (
                <ViewProduct show={showView} close={handleCloseView} product={selectedProduct}/>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h5>No Products Found</h5>
        </div>
      )}
    </>
  );
}

export default TableProduct;

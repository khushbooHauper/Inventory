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
import useStatus from "../hooks/useStatus";
import ViewProduct from "../modals/ViewProduct";
import { TableProductProps } from "../types/table";
import ProductRow from "./ProductRow";
import PaginationComponent from "./Pagination";

const TableProduct: React.FC<TableProductProps> = ({
  searchQuery,
  filteredProducts,
}) => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  // Calculate start and end index for displayed items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = filteredProducts?.slice(startIndex, endIndex);

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
              {displayedProducts.length !== 0 ? (
                displayedProducts &&
                displayedProducts.map((p, index) => (
                  <ProductRow
                    key={`${p.id}-${index}`}
                    product={p}
                    handleOpenView={handleOpenView}
                    onDelete={onDelete}
                    handleStatus={handleStatus}
                  />
                ))
              ) : (
                <h6 className="search-not-found">Searched product not found</h6>
              )}

              {showConfirmationDelete && idToDelete !== null && (
                <Confirm
                  onClick={() => deleteFinally(idToDelete)}
                  handleCancel={handleCancelDelete}
                  show={show}
                  disabled={loadingDelete}
                  confirmName={"delete"}
                />
              )}
              {showConfirmationStatus && idToStatus !== undefined && (
                <Confirm
                  onClick={() => statusFinally(idToStatus)}
                  handleCancel={handleCancelStatus}
                  show={show}
                  disabled={loadingStatus}
                  confirmName={"update"}
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
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default TableProduct;

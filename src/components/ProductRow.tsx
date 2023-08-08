// ProductRow.js
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { ProductRowProps } from "../types/productRow";

const ProductRow = ({
  product,
  handleOpenView,
  onDelete,
  handleStatus,
}:ProductRowProps) => {
  return (
    <tr>
      <td data-th="Image">
        {product.selectedImages[0] &&
          typeof product.selectedImages[0] === "string" && (
            <img
              src={product.selectedImages[0]}
              alt="Product Images"
              className="image-table-preview"
            />
          )}
      </td>
      <td data-th="Name">
        {product.name.length > 30 ? (
          <span title={product.name}>{product.name.substring(0, 10)}</span>
        ) : (
          product.name
        )}
      </td>
      <td data-th="Category">{product.category && product.category.slice(0, 10)}</td>
      <td data-th="SubCategory">{product.subcategory && product.subcategory.slice(0, 10)}</td>
      <td data-th="Price">{product.price}</td>
      <td data-th="Status">
        <Badge
          bg={product.status === "active" ? "success" : "danger"}
          className="fixed-badge-width"
        >
          {product.status}
        </Badge>
      </td>
      <td data-th="CreatedAt">{product.createdAt && product.createdAt.slice(0, 10)}</td>
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
            <span>Actions</span>{" "}
            <i className="fa fa-angle-down"></i>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => handleOpenView(product)}
              >
                View
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={`/add-product/${product.id}`}
              >
                Edit
              </Link>
            </li>
            <li
              className="dropdown-item cursor"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </li>
            <li>
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => handleStatus(product.id)}
              >
                Status
              </Link>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;

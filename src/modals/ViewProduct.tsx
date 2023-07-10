import React, { useState } from "react";
import { Modal, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "../assets/styles/viewproduct.scss";

interface ViewProductProps {
  show: boolean;
  close: () => void;
  product: any;
}

const ViewProduct: React.FC<ViewProductProps> = ({ show, close, product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <Modal show={show} onHide={close} size="lg" centered className="view">
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-details-container">
          <div className="product-images">
            <div className="img-display">
              <img
                src={product.selectedImages[selectedImageIndex]}
                alt={`Images ${selectedImageIndex}`}
                className="main-image"
                
              />
            </div>
            <div className="img-select">
              {product.selectedImages.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`img-item ${
                    index === selectedImageIndex ? "active" : ""
                  }`}
                  onClick={() => handleImageSelect(index)}
                >
                  <img src={image} alt={`Images ${index}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="product-info">
            <p>
              <strong>Price:</strong> INR {product.price}
            </p>
            <p>
              <strong>Weight:</strong> {product.weight} Kg
            </p>
            <p>
              <strong> Status:</strong>{" "}
              <Badge bg={product.status === "active" ? "success" : "danger"}>
                {product.status}
              </Badge>
            </p>
            <div
              className={`description ${showFullDescription ? "expanded" : ""}`}
            >
              <p>
                <strong>Description:</strong>{" "}
                {showFullDescription
                  ? product.des
                  : `${product.des.substring(0, 100)}...`}
              </p>
              <Link onClick={toggleDescription} to="#">
                {showFullDescription ? "Read Less" : "Read More"}
              </Link>
            </div>

            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Model:</strong> {product.model}
            </p>
            <p>
              <strong>Model Number:</strong> {product.modelNumber}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Sub-Category:</strong> {product.subcategory}
            </p>
            <p>
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p>
              <strong>Dimensions:</strong> {product.dimensions}
            </p>
            <p>
              <strong>Manufacturere:</strong> {product.manufacturer}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close} variant="dark">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewProduct;

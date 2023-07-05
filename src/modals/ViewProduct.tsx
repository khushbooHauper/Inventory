import React, { useState } from 'react';
import { Modal, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import '../assets/styles/viewproduct.scss';

interface ViewProductProps {
  show: boolean;
  close: () => void;
  product: any;
}

const ViewProduct: React.FC<ViewProductProps> = ({ show, close, product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
                style={{width:'500px',height:'300px'}}
              />
            </div>
            <div className="img-select">
              {product.selectedImages.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`img-item ${index === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => handleImageSelect(index)}
                >
                  <img src={image} alt={`Images ${index}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="product-info">
            <p>Price: INR {product.price}</p>
            <p>Weight: {product.weight} Kg</p>
            <p>
              Status:{' '}
              <Badge bg={product.status === 'active' ? 'success' : 'danger'}>
                {product.status}
              </Badge>
            </p>
            <p>Description: {product.des}</p>
            {/* Add other product details as needed */}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewProduct;

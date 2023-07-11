import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ConfirmProps } from "../types/confirmStatus";



const ConfirmStatus: React.FC<ConfirmProps> = ({ onClick, handleCancel, show, disabled }) => {
    const handleUpdate = () =>{
        onClick();
        handleCancel();
    }
  return (
    <Modal show={show} onHide={handleCancel} centered >
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to Change the status?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="warning" onClick={handleUpdate}>update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmStatus;

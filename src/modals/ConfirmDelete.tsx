import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ConfirmProps } from "../types/confirmDelete";

const Confirm = ({
  onClick,
  handleCancel,
  show,
  disabled,
  confirmName,
}: ConfirmProps) => {
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(disabled);
  const [update, setUpdate] = useState(disabled);
  const handleDelete = async () => {
    setDeleteButtonDisabled(true);
    await onClick();
    setDeleteButtonDisabled(false);
    handleCancel();
  };
  const handleUpdate = () => {
    onClick();
    handleCancel();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to {confirmName}?</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCancel}
          disabled={deleteButtonDisabled}
        >
          Cancel
        </Button>
        {confirmName === "delete" ? (
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleteButtonDisabled}
          >
            {deleteButtonDisabled ? "Deleting..." : "Delete"}
          </Button>
        ) : (
          <Button variant="warning" onClick={handleUpdate} disabled={disabled}>
            {update ? "updating..." : "update"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Confirm;

import React, { useState } from 'react';
import { Modal,Button} from 'react-bootstrap';

interface ConfirmProps {
    onClick: () => Promise<void>;
  handleCancel: () => void;
  show: boolean;
  disabled: boolean;
}

const Confirm: React.FC<ConfirmProps> = ({ onClick, handleCancel, show, disabled }) => {
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(disabled);

  const handleDelete = async () => {
    setDeleteButtonDisabled(true);
    await onClick();
    setDeleteButtonDisabled(false);
    handleCancel();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel} disabled={deleteButtonDisabled}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={deleteButtonDisabled}>
          {deleteButtonDisabled ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirm;

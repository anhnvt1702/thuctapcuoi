import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationDialog({ openConfirm, messageConfirm, onConfirm, onCancelConfirm }) {
  return (
    <Modal show={openConfirm} onHide={onCancelConfirm} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{messageConfirm}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancelConfirm}>
          Không
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Có
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationDialog;

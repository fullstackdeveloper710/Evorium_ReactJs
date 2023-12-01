import { Modal } from "react-bootstrap";
import React from "react";
import "../../styles/common/customModal.scss"

const CustomModal = ({ modalHead, show, handleClose, children,className }) => {
  return (
    <Modal show={show} onHide={handleClose} className={className}>
      <div>
        <Modal.Header closeButton>
          <Modal.Title>{modalHead}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </div>
    </Modal>
  );
};

export default CustomModal;

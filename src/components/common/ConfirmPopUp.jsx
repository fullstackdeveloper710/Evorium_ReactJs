import React from "react";
import { Modal } from "react-bootstrap";
import BtnGroup from "./BtnGroup";
import Button from "./Button";

const ConfirmPopUp = ({
  showConfirm,
  handleConfirmClose,
  confirmationMsg,
  onConfirmHandler,
}) => {
  return (
    <Modal
      show={showConfirm}
      onHide={handleConfirmClose}
      className="d-flex justify-content-center align-items-center zindex-modal"
    >
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmationMsg ?? "Are you sure to delete?"}</Modal.Body>
        <Modal.Footer>
          <BtnGroup className="common_btns">
            <Button
              loading={true}
              loadMsg="loading..."
              title="Yes"
              type="submit"
              className="primary_btn"
              onClick={onConfirmHandler}
            />
            <Button
              title="cancel"
              type="button"
              className="secondry_btn"
              onClick={handleConfirmClose}
            />
          </BtnGroup>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ConfirmPopUp;

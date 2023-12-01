import Button from "./Button";
import Modal from "react-bootstrap/Modal";

function Alert({ title, body, btnTitle, show, showClose, icon }) {
  return (
    <>
      {show && (
        <div
          className="AlertModal modal show "

          // style={{
          //   display: "block",
          //   position: "absolute",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   background: "rgba(0, 0, 0, 0.6)",
          // }}
        >
          <Modal.Dialog>
            <Modal.Body>
              <div className="AlertModal__text">
                <span className="AlertIcon">{icon}</span>
                <h1>{title}</h1>
                <p>{body}</p>

                <Button submit={showClose} title={btnTitle}></Button>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      )}
    </>
  );
}

export default Alert;

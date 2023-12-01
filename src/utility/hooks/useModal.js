import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState(false);
  const [shareShow, setShareShow] = useState(false)

  const handleShareShow = () => {
    setShareShow(true)
    console.log('in handle Share show')
  }
  const handleShareClose = () => {
    setShareShow(false)
  }

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return {
    shareShow,
    show,
    handleClose,
    handleShow,
    handleShareShow,
    handleShareClose
  };
};

export default useModal;

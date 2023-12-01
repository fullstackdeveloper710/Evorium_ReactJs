import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useConfirmation = ({ action }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setId] = useState(null);

  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Methods
  const handleConfirmShow = () => {
    setShowConfirm(true);
  };
  const handleConfirmClose = () => {
    setShowConfirm(false);
  };
  const onConfirmHandler = () => {
    const data = {
      adminAuthtoken,
      values: {
        id,
      },
    };
    dispatch(action(data)).then(({ payload }) => {
      if (payload) {
        handleConfirmClose();
      }
    });
  };
  return {
    id,
    setId,
    showConfirm,
    handleConfirmShow,
    handleConfirmClose,
    onConfirmHandler,
  };
};

export default useConfirmation;

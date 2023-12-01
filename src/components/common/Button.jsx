import React from "react";
import { useSelector } from "react-redux";

const Button = ({
  disable,
  loading,
  loadMsg,
  type,
  title,
  className,
  onClick,
}) => {
  const { btnLoader } = useSelector((state) => state.app);
  return (
    <button
      disabled={disable || (btnLoader && loading)}
      type={type}
      className={`${className} text-capitalize`}
      onClick={onClick}
    >
      {btnLoader && loading ? loadMsg : title}
    </button>
  );
};

export default Button;

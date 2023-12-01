import React from "react";

const CustomModal = ({ title, description }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "red",
          height: "300px",
          width: "300px",
          marginTop: "100px",
        }}
      >
        <p>{title}</p>
      </div>
    </div>
  );
};

export default CustomModal;

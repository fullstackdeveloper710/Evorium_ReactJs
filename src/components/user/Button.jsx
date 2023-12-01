import React from "react";

const Button = ({ type, title, submit }) => {

  return (
    <button
      className="authbtn"
      onClick={submit}
      type={type}
      style={{
        backgroundColor: "#AE00FF",
        color: "#FFFFFF",
        textAlign: "center",
        padding: 10,
        borderRadius: 6,
        fontWeight: "600",
        fontSize: 20,
        width:"100%",
        border:"none"
      }}
    >
        
    {title}
    </button>
  );
};

export default Button;

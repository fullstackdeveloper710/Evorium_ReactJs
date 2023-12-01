import React from "react";

const RadioGroup = ({ groupClass, children, title, error }) => {
  return (
    <div className="">
      <div className={groupClass}>
        <h5>{title}</h5>
        {children}
      </div>
      {error && <span className="error_msg">{error}</span>}
    </div>
  );
};

export default RadioGroup;

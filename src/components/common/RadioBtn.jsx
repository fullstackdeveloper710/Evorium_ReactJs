import React from "react";

const RadioBtn = ({ id, name, label, value, onChange, checked }) => {
  return (
    <div className="radio_button">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default RadioBtn;

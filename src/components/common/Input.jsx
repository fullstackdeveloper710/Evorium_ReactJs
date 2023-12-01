import React from "react";

const Input = ({
  label,
  type,
  placeholder,
  name,
  value,
  onBlur,
  onChange,
  error,
  className,
}) => {
  return (
    <div className={className}>
      {label && <label className="text-capitalize">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {error && <span className="error_msg">{error}</span>}
    </div>
  );
};

export default Input;

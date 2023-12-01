import React from "react";

const SelectBox = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  className,
  options,
  error,
}) => {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <select name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map(({ value, label }, index) => (
          <option
            key={index}
            value={value}
            label={label}
            className="text-capitalize"
          >
            {label}
          </option>
        ))}
      </select>
      {error && <span className="error_msg">{error}</span>}
    </div>
  );
};

export default SelectBox;

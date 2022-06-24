import React from "react";

const FormRowArea = ({
  name,
  value,
  handleChange,
  labelText,
  disabled,
  className,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {labelText || name}
      </label>
      <textarea
        name={name}
        id={name}
        rows="4"
        disabled={disabled}
        className={className}
        value={value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default FormRowArea;

import React from "react";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  disabled,
  className,
}) => {
  return (
    <div className="mb-6">
      {name !== "search" && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {labelText || name}
        </label>
      )}

      <input
        type={type}
        id={name}
        className={className}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required
      />
    </div>
  );
};

export default FormRow;

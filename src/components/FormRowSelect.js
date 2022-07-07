import React from "react";

const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  className,
  disabled,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className={className}
        disabled={disabled}
      >
        {list.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;

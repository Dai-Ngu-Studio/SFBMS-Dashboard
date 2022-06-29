import React from "react";
import moment from "moment";

const FormRowTime = ({
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
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        className={className}
        name={name}
        value={moment(value).format("HH:mm:ss")}
        onChange={handleChange}
        disabled={disabled}
        required
      />
    </div>
  );
};

export default FormRowTime;

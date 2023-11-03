import React from "react";

type InputType = {
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  defaultValue?: string;
  readOnly?: boolean;
};
const FormInput: React.FC<InputType> = ({
  type,
  placeholder,
  name,
  defaultValue,
  readOnly,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      defaultValue={defaultValue}
      readOnly={readOnly}
    />
  );
};

export default FormInput;

import React from "react";
const LoginInputs = (props) => {
  return (
    <input
      {...props.input}
      className={props.className}
      placeholder={props.placeholder}
      type={props.type}
      autoComplete="off"
    />
  );
};
export default LoginInputs;

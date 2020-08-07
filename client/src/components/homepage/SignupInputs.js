import React from "react";
const SignupInputs = (props) => {
  return (
    <input
      {...props.input}
      id={props.id}
      className={props.className}
      placeholder={props.placeholder}
      type={props.type}
      autoComplete="off"
    />
  );
};
export default SignupInputs;

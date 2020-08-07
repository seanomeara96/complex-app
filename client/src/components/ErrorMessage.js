import React from "react";

const ErrorMessage = ({ message }) => {
  return <div className="alert alert-danger small">{message}</div>;
};

export default ErrorMessage;

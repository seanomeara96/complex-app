import React from "react";
const Flash = ({ errors, successes }) => {
  // For each error
  let errorMessages = errors.map((message) => {
    return (
      <div className="alert text-center alert-danger small">{message}</div>
    );
  });
  // For each success
  let successMessages = successes.map((message) => {
    return (
      <div className="alert text-center alert-success small">{message}</div>
    );
  });
  if (errorMessages) {
    return <div>{errorMessages}</div>;
  } else if (successMessages) {
    return <div>{successMessages}</div>;
  } else {
    return <div></div>;
  }
};

export default Flash;

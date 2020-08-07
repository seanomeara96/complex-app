import React from "react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="container py-md-5 container--narrow">
      <div className="text-center">
        <h2>Whoops, we cannot find that page.</h2>
        <p className="lead text-muted">
          You can always visit the <Link to="/">homepage</Link> to get a fresh
          start.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;

import React from "react";
import api from "../axios/config";
import Cookies from "js-cookie";
const Footer = () => {
  const handleClick = async () => {
    console.log(Cookies.get());
  };
  return (
    <footer className="border-top text-center small text-muted py-3">
      <p className="m-0">
        Copyright &copy; 2020{" "}
        <span onClick={handleClick} className="text-muted">
          Sean O'Meara
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

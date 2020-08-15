import React from "react";
import Header from "./header/Header";
import Footer from "./Footer";
import ChatBox from "./ChatBox";
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
    <ChatBox />
  </>
);

export default Layout;

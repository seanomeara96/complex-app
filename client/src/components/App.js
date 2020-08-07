import React from "react";
import Header from "./header/Header";
import Footer from "./Footer";
import ChatBox from "./ChatBox";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import CreatePost from "./posts/CreatePost";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={HomePage} />
      <Route path="/create-post" component={CreatePost} />
      <Footer />
      <ChatBox />
    </BrowserRouter>
  );
};

export default App;

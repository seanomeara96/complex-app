import React, { useEffect } from "react";
import Header from "./header/Header";
import Footer from "./Footer";
import ChatBox from "./ChatBox";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import CreatePost from "./posts/CreatePost";
import Profile from "./users/Profile";
import { connect } from "react-redux";
import { validateSession } from "../actions";
const App = (props) => {
  const { validateSession } = props;
  useEffect(() => {
    validateSession();
  }, [validateSession]);
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" exact component={HomePage} />
      <Route path="/create-post" component={CreatePost} />
      <Route
        path="/profile/:username"
        currentPage="posts"
        component={Profile}
      />
      <Footer />
      <ChatBox />
    </BrowserRouter>
  );
};

export default connect(null, { validateSession })(App);

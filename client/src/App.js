import React, { useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import ChatBox from "./components/chat/ChatBox";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import CreatePost from "./components/posts/CreatePost";
import Profile from "./components/profile/Profile";
import SinglePostScreen from "./components/posts/SinglePostScreen";
import { connect } from "react-redux";
import { validateSession } from "./actions";
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
      <Route path="/post/:postId" component={SinglePostScreen} />
      <Footer />
      <ChatBox />
    </BrowserRouter>
  );
};

export default connect(null, { validateSession })(App);

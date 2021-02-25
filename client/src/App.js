import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/home";
import CreatePost from "./pages/create-post";
import Profile from "./pages/profile";
import SinglePostScreen from "./pages/single-post";
import { validateSession } from "./actions/auth-actions";
import Layout from "./components/Layout";
const App = (props) => {
  const { validateSession } = props;
  useEffect(() => {
    validateSession();
  }, [validateSession]);
  return (
    <BrowserRouter>
      <Layout>
        <Route path="/" exact component={HomePage} />
        <Route path="/create-post" component={CreatePost} />
        <Route
          path="/profile/:username"
          currentPage="posts"
          component={Profile}
        />
        <Route path="/post/:postId" component={SinglePostScreen} />
      </Layout>
    </BrowserRouter>
  );
};

export default connect(null, { validateSession })(App);

import React from "react";
import { connect } from "react-redux";

import PostBlock from "./PostBlock";

const PostFeed = (props) => {
  let feed = [];
  props.posts.forEach((element) => {
    let post = (
      <PostBlock
        title={element.title}
        userId={element.userId}
        key={element.title}
      />
    );
    feed.push(post);
  });
  return feed;
};
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps)(PostFeed);

import React from "react";

import PostBlock from "./PostBlock";

const PostFeed = (props) => {
  let feed = [];
  props.posts.forEach((element) => {
    let post = (
      <PostBlock
        title={element.title}
        userId={element.userId}
        key={feed.length}
      />
    );
    feed.push(post);
  });
  return feed;
};

export default PostFeed;

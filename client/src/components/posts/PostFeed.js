import React from "react";

import PostBlock from "./PostBlock";

const PostFeed = (props) => {
  let feed = [];
  props.posts.forEach((element) => {
    console.log("elements", element);
    let post = (
      <PostBlock title={element.title} postId={element._id} key={feed.length} />
    );
    feed.push(post);
  });
  return feed;
};

export default PostFeed;

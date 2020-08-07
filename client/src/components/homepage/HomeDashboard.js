import React from "react";
import PostBlock from "./PostBlock";
import { connect } from "react-redux";
import EmptyFeed from "./EmptyFeed";
import axios from "axios";
import { posts } from "../../actions";
import Flash from "../Flash";
class HomeDashboard extends React.Component {
  componentDidMount() {
    // request posts from people you follow
    // if there are posts render the posts
    // else render the empty feed component

    // temporary call to placheolder json server
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then((res) => {
      this.props.posts(res.data);
    });
  }

  renderPostBlocks = () => {
    let list = [];
    // Ouputs a block for each post
    this.props.homeFeed.forEach((element) => {
      let postToPush = (
        <PostBlock
          title={element.title}
          userId={element.userId}
          key={element.title}
        />
      );
      list.push(postToPush);
    });
    return list;
  };

  render() {
    if (this.props.homeFeed.length > 0) {
      return (
        <div className="container py-md-5 container--narrow">
          <Flash successes={this.props.successes} errors={this.props.errors} />
          <h2 className="text-center mb-4">The Latest From Those You Follow</h2>
          <div className="list-group">{this.renderPostBlocks()}</div>
        </div>
      );
    } else {
      return <EmptyFeed />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    homeFeed: state.posts,
    successes: state.flash.successes,
    errors: state.flash.errors,
  };
};

export default connect(mapStateToProps, {
  posts,
})(HomeDashboard);

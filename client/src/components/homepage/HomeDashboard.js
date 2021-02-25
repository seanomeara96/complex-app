import React from "react";
import { connect } from "react-redux";
import EmptyFeed from "./EmptyFeed";
import { fetchPosts } from "../../actions/post-actions";
import Flash from "../Flash";
import PostFeed from "../posts/PostFeed";
class HomeDashboard extends React.Component {
  componentDidMount() {
    // temporary call to placheolder json server

    this.props.fetchPosts();
  }

  render() {
    if (this.props.homeFeed.length > 0) {
      return (
        <div className="container py-md-5 container--narrow">
          <Flash successes={this.props.successes} errors={this.props.errors} />
          <h2 className="text-center mb-4">The Latest From Those You Follow</h2>
          <div className="list-group">
            <PostFeed posts={this.props.posts} />
          </div>
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
    posts: state.posts,
  };
};

export default connect(mapStateToProps, {
  fetchPosts,
})(HomeDashboard);

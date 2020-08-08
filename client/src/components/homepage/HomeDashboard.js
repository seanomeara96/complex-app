import React from "react";
import { connect } from "react-redux";
import EmptyFeed from "./EmptyFeed";
import axios from "axios";
import { posts } from "../../actions";
import Flash from "../Flash";
import PostFeed from "../posts/PostFeed";
class HomeDashboard extends React.Component {
  componentDidMount() {
    // temporary call to placheolder json server
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then((res) => {
      this.props.posts(res.data);
    });
  }

  render() {
    if (this.props.homeFeed.length > 0) {
      return (
        <div className="container py-md-5 container--narrow">
          <Flash successes={this.props.successes} errors={this.props.errors} />
          <h2 className="text-center mb-4">The Latest From Those You Follow</h2>
          <div className="list-group">
            <PostFeed />
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
  };
};

export default connect(mapStateToProps, {
  posts,
})(HomeDashboard);

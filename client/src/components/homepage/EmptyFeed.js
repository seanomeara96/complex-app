import React from "react";
import Flash from "../Flash";
import { connect } from "react-redux";

const EmptyFeed = (props) => {
  console.log();
  return (
    <div className="container py-md-5 container--narrow">
      <Flash errors={props.errors} successes={props.successes} />
      <div className="text-center">
        <h2>
          Hello <strong>{props.auth.auth.username}</strong>, your feed is empty.
        </h2>
        <p className="lead text-muted">
          Your feed displays the latest posts from the people you follow. If you
          don&rsquo;t have any friends to follow that&rsquo;s okay; you can use
          the &ldquo;Search&rdquo; feature in the top menu bar to find content
          written by people with similar interests and then follow them.
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(EmptyFeed);

import React from "react";
import GuestHome from "./GuestHome";
import HomeDashboard from "./HomeDashboard";
import { connect } from "react-redux";
import { validateSession } from "../../actions";
const Homepage = (props) => {
  if (props.isSignedIn === false) {
    return <GuestHome />;
  } else {
    return <HomeDashboard />;
  }
};
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { validateSession })(Homepage);

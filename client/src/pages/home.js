import React from "react";
import GuestHome from "../components/homepage/GuestHome";
import HomeDashboard from "../components/homepage/HomeDashboard";
import { connect } from "react-redux";
import { validateSession } from "../actions/auth-actions";
const Homepage = (props) => {
  return props.isSignedIn === false ? <GuestHome /> : <HomeDashboard />;
};
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { validateSession })(Homepage);

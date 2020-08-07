import React, { Component } from "react";
import GuestHome from "./GuestHome";
import HomeDashboard from "./HomeDashboard";
import { connect } from "react-redux";
class Homepage extends Component {
  render() {
    if (this.props.isSignedIn === null) {
      return <GuestHome />;
    } else {
      return <HomeDashboard />;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps)(Homepage);

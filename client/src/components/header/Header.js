import React from "react";
import { connect } from "react-redux";
import { signIn, signOut, openChatBox, closeChatBox } from "../../actions";
import UserLoggedIn from "./UserLoggedIn";
import UserLoggedOut from "./UserLoggedOut";
import { Link } from "react-router-dom";
/* 
    This file should eventually be passed in information 
    that will determine whether to show a login option
*/

class Header extends React.Component {
  state = { modalOpen: false };
  toggleChatbox = () => {
    if (this.props.isChatBoxOpen === false) {
      this.props.openChatBox();
    } else {
      this.props.closeChatBox();
    }
  };
  handleClick = () => {
    if (this.state.modalOpen === true) {
      this.setState({ modalOpen: false });
    } else {
      this.setState({ modalOpen: true });
    }
  };
  renderUserControls() {
    if (this.props.user.isSignedIn === false) {
      return <UserLoggedOut signIn={this.props.signIn} />;
    } else {
      return (
        <UserLoggedIn
          csrfToken={this.props.csrfToken}
          engageChat={this.toggleChatbox}
          user={this.props.user}
          signOut={this.props.signOut}
          handleClick={this.handleClick}
          searchIsOpen={this.state.modalOpen}
        />
      );
    }
  }
  render() {
    return (
      <header className="header-bar mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-center p-3">
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <Link to="/" className="text-white">
              MyApp
            </Link>
          </h4>
          {this.renderUserControls()}
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    csrfToken: state.csrfToken,
    user: state.auth,
    isChatBoxOpen: state.chatBox,
  };
};
export default connect(mapStateToProps, {
  signIn,
  signOut,
  openChatBox,
  closeChatBox,
})(Header);

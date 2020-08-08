import React from "react";
import { connect } from "react-redux";

const ChatBox = (props) => {
  let classlist = `chat-wrapper shadow border-top border-left border-right ${
    props.isOpen ? "chat--visible" : ""
  }`;
  if (props.isSignedIn === true) {
    return <div id="chat-wrapper" className={classlist}></div>;
  } else {
    return null;
  }
};
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    isOpen: state.chatBox,
  };
};
export default connect(mapStateToProps)(ChatBox);

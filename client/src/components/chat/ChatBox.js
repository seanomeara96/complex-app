import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
class ChatBox extends React.Component {
  state = { message: "", chatLog: [], connectionIsOpen: false };

  onSubmit = (e) => {
    setTimeout(() => {}, 3000);
    e.preventDefault();

    this.sendMessageToServer();
  };
  componentDidUpdate() {
    if (this.props.isOpen === true && this.state.connectionIsOpen === false) {
      this.setState({ connectionIsOpen: true });
      this.openConnection();
      console.log("connection opened");
    }
    if (this.props.isOpen === false && this.state.connectionIsOpen === true) {
      console.log("connection closed");
    }
  }

  openConnection() {
    this.socket = io("http://localhost:3001");
    this.socket.on("welcome", (data) => {
      this.username = data.username;
      this.avatar = data.avatar;
    });
    this.socket.on("chatMessageFromServer", (data) => {
      this.renderMessage("server", data.message, data.avatar, data.username);
    });
  }
  renderMessage(type, message, avatar, username = "") {
    let newMessage;
    if (type === "self") {
      newMessage = (
        <div key={new Date().getTime()} className="chat-self">
          <div className="chat-message">
            <div className="chat-message-inner">
              {DOMPurify.sanitize(message)}
            </div>
          </div>
          <img
            alt="tiny avatar"
            className="chat-avatar avatar-tiny"
            src={DOMPurify.sanitize(avatar)}
          />
        </div>
      );
    } else {
      newMessage = (
        <div key={new Date().getTime()} className="chat-other">
          <Link to={`/profile/${DOMPurify.sanitize(username)}`}>
            <img
              alt="tiny avatar"
              className="avatar-tiny"
              src={DOMPurify.sanitize(avatar)}
            />
          </Link>
          <div className="chat-message">
            <div className="chat-message-inner">
              <Link to={`/profile/${DOMPurify.sanitize(username)}`}>
                <strong>{DOMPurify.sanitize(username)}:</strong>{" "}
              </Link>
              {DOMPurify.sanitize(message)}
            </div>
          </div>
        </div>
      );
    }
    this.setState({ chatLog: [...this.state.chatLog, newMessage] });
  }
  renderChatLog() {
    if (this.state.chatLog.length) {
      return this.state.chatLog;
    }
    //this.chatLog.scrollTop = this.chatLog.scrollHeight;
  }
  sendMessageToServer() {
    //emit() takes two arguments
    //1st is a name that describes the event
    //2nd is an object with the data we want to send to the server
    this.socket.emit("chatMessageFromBrowser", {
      message: this.state.message,
    });

    this.renderMessage("self", this.state.message, this.avatar);
    //this.chatLog.insertAdjacentHTML("beforeend");
    this.chatLog.scrollTop = this.chatLog.scrollHeight;
    this.chatField.value = "";
    this.chatField.focus();
  }
  renderChatField() {
    if (this.props.isOpen === true) {
      return (
        <input
          type="text"
          className="chat-field"
          id="chatField"
          placeholder="Type a message…"
          autoComplete="off"
          autoFocus
          name="message"
          ref={(input) => (this.chatField = input)}
          onChange={() => {
            this.setState({ message: this.chatField.value });
          }}
        />
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    if (this.props.isSignedIn === true) {
      return (
        <div
          id="chat-wrapper"
          className={`chat-wrapper shadow border-top border-left border-right ${
            this.props.isOpen ? "chat--visible" : ""
          }`}
        >
          <div className="chat-title-bar">
            Chat{" "}
            <span className="chat-title-bar-close">
              <i className="fas fa-times-circle"></i>
            </span>
          </div>
          <div
            id="chat"
            className="chat-log"
            ref={(chatlog) => (this.chatLog = chatlog)}
          >
            {this.renderChatLog()}
          </div>
          <form
            id="chatForm"
            className="chat-form border-top"
            onSubmit={(vals) => {
              this.onSubmit(vals);
            }}
          >
            {this.renderChatField()}
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    isOpen: state.chatBox,
  };
};
export default connect(mapStateToProps)(ChatBox);

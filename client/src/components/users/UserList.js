import React from "react";
import { connect } from "react-redux";
import UserBlock from "./UserBlock";
const UserList = (props) => {
  let userList = [];
  props.users.forEach((element) => {
    let user = (
      <UserBlock
        title={element.title}
        userId={element.userId}
        key={element.title}
      />
    );
    userList.push(user);
  });
  return userList;
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
export default connect(mapStateToProps)(PostFeed);

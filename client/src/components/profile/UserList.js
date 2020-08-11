import React from "react";
import UserBlock from "./UserBlock";

const UserList = (props) => {
  let userList = [];
  props.users.forEach((element, index) => {
    let user = (
      <UserBlock
        username={element.username}
        avatar={element.avatar}
        key={index}
      />
    );
    userList.push(user);
  });
  return userList;
};

export default UserList;

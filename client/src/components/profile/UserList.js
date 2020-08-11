import React from "react";
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

export default UserList;

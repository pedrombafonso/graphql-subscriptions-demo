import React from "react";

export const Message = ({ user, text }) => {
  return (
    <div>
      <div>User: {user}</div>
      <div>Message: {text}</div>
    </div>
  );
};

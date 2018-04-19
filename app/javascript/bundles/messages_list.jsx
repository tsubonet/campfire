import React from "react";

const MessagesList = ({ messages }) => (
  <div>
    {messages.map((message, i) => {
      return <div key={i}>{message.content}</div>;
    })}
  </div>
);

export default MessagesList;

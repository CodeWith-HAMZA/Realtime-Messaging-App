import React from "react";
import Message from "./Message";

const MessagesList = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-80 overflow-y-auto">
      <Message text="Hello!" sender="User 1" isSent={true} />
      <Message text="Hi there!" sender="User 2" isSent={false} />
      {/* Add more chat messages as needed */}
    </div>
  );
};

export default MessagesList;

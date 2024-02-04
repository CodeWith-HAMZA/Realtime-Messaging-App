'use client'
import React from "react";
import Message from "./cards/Message";
import { useUser } from "@/app/context/UserProvider";

const MessagesList = () => {
  const u = useUser();

  return (
    u.user.isLoggedIn && <div className="bg-white rounded-lg shadow-lg p-4 h-80 overflow-y-auto">
      <Message text="Hello!" sender="User 1" isSent={true} />
      <Message text="Hi there!" sender="User 2" isSent={false} />
      {/* Add more chat messages as needed */}
    </div>
  );
};

export default MessagesList;

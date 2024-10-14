"use client";
import React from "react"; 
import { Message } from "@/utils/interfaces/message";
import MessageCard from "./cards/MessageCard";
import { isCurrentUserSender } from "@/lib/utils";
interface Props {
  messages: Message[];
}
const MessagesList = ({ messages }: Props) => {
  return (
    <div className="space-y-4 messagesContainer" id="p2">
      {messages &&
        messages?.map((m, idx) => (
          <MessageCard
            key={idx}
            sender={m.sender.email}
            message={m}
            isSender={isCurrentUserSender(m.sender._id)}
          />
        ))}
    </div>
  );
};

export default MessagesList;

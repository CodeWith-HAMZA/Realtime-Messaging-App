import React from "react";

interface MessageProps {
  content: string;
  sender: string;
  isSent: boolean;
}

const Message: React.FC<MessageProps> = ({ content, sender, isSent }) => {
  return (
    <div className={`mb-4 ${isSent ? "text-right" : ""}`}>
      <div className="text-sm font-medium text-gray-600">{sender}</div>
      <div
        className={`p-3 rounded-lg inline-block ${
          isSent ? "bg-blue-500" : "bg-green-500"
        } text-white`}
      >
        {content}
      </div>
    </div>
  );
};

export default Message;

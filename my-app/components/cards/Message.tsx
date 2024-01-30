import React from "react";

interface MessageProps {
  text: string;
  sender: string;
  isSent: boolean;
}

const Message: React.FC<MessageProps> = ({ text, sender, isSent }) => {
  return (
    <div className={`mb-4 ${isSent ? "text-right" : ""}`}>
      <div className="text-sm font-medium text-gray-600">{sender}</div>
      <div
        className={`p-3 rounded-lg inline-block ${isSent ? "bg-blue-500" : "bg-green-500"
          } text-white`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
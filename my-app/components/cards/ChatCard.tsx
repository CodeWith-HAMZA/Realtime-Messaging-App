import { Chat } from '@/utils/types';
import React from 'react';

interface UserContactProps {
  chat: Chat;
}

const ChatCard: React.FC<UserContactProps> = ({ chat }) => {
  return (
    <li className="mb-2 flex items-center">
      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
      <span className="text-gray-800 hover:text-blue-500 cursor-pointer">
        <div>
          {chat.chatName}
          {chat.isGroupChat ? "(Group)" : '(Private-Chat)'}
        </div>
        <span>users: {chat.users.length}</span>
      </span>
    </li>
  );
};

export default ChatCard;
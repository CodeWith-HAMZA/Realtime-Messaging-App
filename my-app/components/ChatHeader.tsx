import React from "react";

const ChatHeader = () => {
  return (
    <header className="bg-blue-500 text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-semibold">Chat App</h1>
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        <span className="text-sm font-medium">User 1</span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-sm font-medium text-gray-300 hover:text-gray-100 focus:outline-none transform hover:scale-105 transition duration-300">
          Profile
        </button>
        <button className="text-sm font-medium text-gray-300 hover:text-gray-100 focus:outline-none transform hover:scale-105 transition duration-300">
          Settings
        </button>
        <button className="text-sm font-medium text-gray-300 hover:text-gray-100 focus:outline-none transform hover:scale-105 transition duration-300">
          Logout
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;

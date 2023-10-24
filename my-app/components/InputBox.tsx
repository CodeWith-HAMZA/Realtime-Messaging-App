import React from "react";

const InputBox = () => {
  return (
    <footer className="bg-white py-4 px-8">
      <div className="flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-4 py-2 rounded-lg outline-none focus:ring focus:border-blue-500"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ml-2">
          Send
        </button>
      </div>
    </footer>
  );
};

export default InputBox;

import React from "react";

const Sidebar = () => {
  return (
    <aside className="bg-gray-200 w-1/4 p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <ul>
        <li className="mb-2 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span className="text-gray-800 hover:text-blue-500 cursor-pointer">
            User 1
          </span>
        </li>
        <li className="mb-2 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          <span className="text-gray-800 hover:text-blue-500 cursor-pointer">
            User 2
          </span>
        </li>
        <li className="mb-2 flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
          <span className="text-gray-800 hover:text-blue-500 cursor-pointer">
            User 3
          </span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

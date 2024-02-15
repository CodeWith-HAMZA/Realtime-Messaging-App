import React from "react";
import Sidebar from "./SideBar";
import Chat from "./ChatDetails";

// const ChatApp = () => {
//   return (
//     <div className="font-sans bg-gray-100 h-screen flex">
//       {/* User Sidebar */}
//       <aside className="bg-gray-200 w-1/4 p-4">
//         <div className="flex items-center mb-4">
//           <h2 className="text-xl font-semibold mr-2">Online Users</h2>
//           <span className="bg-green-500 w-2 h-2 rounded-full"></span>
//         </div>
//         <ul>
//           {/* List of online users */}
//           <li className="mb-2 flex items-center">
//             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//             <span className="text-gray-800 hover:text-blue-500 cursor-pointer">
//               User 1
//             </span>
//           </li>
//           <li className="mb-2 flex items-center">
//             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
//             <span className="text-gray-800 hover:text-blue-500 cursor-pointer">
//               User 2
//             </span>
//           </li>
//           <li className="mb-2 flex items-center">
//             <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
//             <span className="text-gray-800 hover:text-blue-500 cursor-pointer">
//               User 3
//             </span>
//           </li>
//         </ul>
//         <div className="mt-4">
//           <h2 className="text-xl font-semibold">Channels</h2>
//           <ul>
//             {/* List of channels */}
//             <li className="mb-2">
//               <span className="text-gray-800 cursor-pointer">General</span>
//             </li>
//             <li className="mb-2">
//               <span className="text-gray-800 cursor-pointer">Marketing</span>
//             </li>
//             <li className="mb-2">
//               <span className="text-gray-800 cursor-pointer">Development</span>
//             </li>
//           </ul>
//         </div>
//       </aside>

//       <main className="flex-grow flex flex-col">
//         <header className="bg-blue-500 text-white py-4 px-8">
//           <h1 className="text-2xl font-semibold">Chat App</h1>
//         </header>

//         <div className="flex-grow p-4">
//           <div className="bg-white rounded-lg shadow-lg p-4 h-80 overflow-y-auto">
//             {/* Display chat messages here */}
//             <div className="mb-4 text-right">
//               <div className="text-sm font-medium text-gray-600">User 1</div>
//               <div className="bg-blue-500 text-white p-3 rounded-lg inline-block">
//                 Hello!
//               </div>
//             </div>
//             <div className="mb-4">
//               <div className="text-sm font-medium text-gray-600">User 2</div>
//               <div className="bg-green-500 text-white p-3 rounded-lg inline-block">
//                 Hi there!
//               </div>
//             </div>
//             {/* Add more chat messages as needed */}
//           </div>
//         </div>

//         <footer className="bg-white py-4 px-8">
//           <div className="flex">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="w-full px-4 py-2 rounded-lg outline-none focus:ring focus:border-blue-500"
//             />
//             <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ml-2">
//               Send
//             </button>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// };

const ChatRoom = () => {
  return (
    <div className="font-sans bg-gray-100 h-screen flex">
      <Chat />
    </div>
  );
};

export default ChatRoom;

import React from "react";
import UserContact from "./cards/UserCard";
import { Chat } from "@/utils/types";
import ChatsList from "./ChatsList";
import { hit } from "@/utils/api";
interface Contact {
  id: number;
  name: string;
}

const Sidebar = async () => {
  const contacts: Contact[] = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'Shaikh shaikh' },
    { id: 3, name: 'User 3' },
    // Add more contacts as needed
  ];


  const chats: Chat[] = await hit('http:localhost:4000/api/chat', { method: "GET" })
  return (
    <aside className="bg-gray-200 w-1/4 p-4">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <ul>
        <ChatsList chats={chats} />
      </ul>
    </aside>
  );
};

export default Sidebar;

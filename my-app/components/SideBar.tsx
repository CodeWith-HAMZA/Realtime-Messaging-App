"use client";
import React, { useEffect, useState } from "react";
import ChatsList from "./ChatsList";
import { hit } from "@/utils/api";
import CreateNewChat from "./CreateNewChat";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUser } from "@/app/context/UserProvider";
import UserCard from "./cards/UserCard";
import ChatService from "@/services/chatService";
import Chat from "@/utils/interfaces/chat";
import { skeleton } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Contact {
  id: number;
  name: string;
}

const Sidebar = () => {
  const [Toggle, setToggle] = useState(false);
  const { Chats, setChats, getAuthCookie } = useUser();
  const [Loading, setLoading] = useState(true);
  const pathname = usePathname();
  const chatService = new ChatService(getAuthCookie());
  useEffect(() => {
    setLoading(true);
    chatService.getAllChats().then((data) => {
      const { chats } = data as { chats: Chat[] };

      setChats(chats);
      setLoading(false);
    });
  }, []);

  return (
    <aside
      className={`bg-white relative shadow-sm ${!Toggle ? "w-1/4" : "w-0"}`}
    >
      <div
        onClick={() => setToggle((_) => !_)}
        className="bg-black w-4 h-4 rounded-full absolute -right-2.5 top-1/2 cursor-pointer hover:h-7 hover:top-[49%] transition-all"
      ></div>

      <div className={`flex flex-col h-full w-full `}>
        <div className="p-4">
          {!Toggle && (
            <div className="flex gap-1 flex-col">
              {" "}
              <Input className={`w-full`} placeholder="Search contacts..." />
              <CreateNewChat />
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          <h3 className="px-4 py-2 font-semibold text-gray-500 dark:text-gray-400">
            Recent Conversations
          </h3>
          <div className="divide-y pt-2 flex-col flex">
            {Loading
              ? skeleton(9)
              : Chats.map((chat) => {
                  const { users } = chat;
                  return (
                    <Link href={"/chat/" + chat._id}>
                      <UserCard
                        className={
                          pathname === "/chat/" + chat._id
                            ? "ring-0 bg-gray-300"
                            : ""
                        }
                        status="Online"
                        user={users.at(1)}
                      />
                    </Link>
                  );
                })}
          </div>
          <h3 className="px-4 py-2 mt-4 font-semibold text-gray-500 dark:text-gray-400">
            Contacts
          </h3>
          <div className="divide-y">
            <div className="flex items-center gap-4 p-4">
              <Avatar>
                <AvatarImage alt="@michaeldoe" src="/placeholder-avatar.jpg" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">Michael Doe</h4>
              </div>
              <div className="h-2.5 w-2.5" />
            </div>
            <div className="flex items-center gap-4 p-4">
              <Avatar>
                <AvatarImage alt="@emilydoe" src="/placeholder-avatar.jpg" />
                <AvatarFallback>ED</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">Emily Doe</h4>
              </div>
              <div className="h-2.5 w-2.5" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

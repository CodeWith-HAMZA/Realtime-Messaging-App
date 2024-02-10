'use client'
import React, { useState } from "react";
import ChatsList from "./ChatsList";
import { hit } from "@/utils/api";
import AllUsers from "./AllUsers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Contact {
  id: number;
  name: string;
}

const Sidebar = () => {
  const [Toggle, setToggle] = useState(false);
  const contacts: Contact[] = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'Shaikh shaikh' },
    { id: 3, name: 'User 3' },
    // Add more contacts as needed
  ];





  return (

    <aside className={`bg-white relative ${!Toggle ? "w-1/4" : "w-0"}`}>
      <div onClick={() => setToggle(_ => !_)} className="bg-black w-4 h-4 rounded-full absolute -right-2.5 top-1/2 cursor-pointer hover:h-7 hover:top-[49%] transition-all"></div>

      <div className={`flex flex-col h-full w-full `} >
        <div className="p-4">
          {!Toggle &&
            <div className="flex gap-1 flex-col">  <Input className={`w-full`} placeholder="Search contacts..." />
              <AllUsers />
            </div>
          }
        </div>
        <div className="flex-1 overflow-y-auto">
          <h3 className="px-4 py-2 font-semibold text-gray-500 dark:text-gray-400">Recent Conversations</h3>
          <div className="divide-y">
            <div className="flex items-center gap-4 p-4">
              <Avatar>
                <AvatarImage alt="@johndoe" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">John Doe</h4>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">Hey, are you there?</p>
              </div>
              <div className="h-2.5 w-2.5" />
            </div>
            <div className="flex items-center gap-4 p-4">
              <Avatar>
                <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">Jane Doe</h4>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">Let's schedule a meeting.</p>
              </div>
              <div className="h-2.5 w-2.5" />
            </div>
          </div>
          <h3 className="px-4 py-2 mt-4 font-semibold text-gray-500 dark:text-gray-400">Contacts</h3>
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

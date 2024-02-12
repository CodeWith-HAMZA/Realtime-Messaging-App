'use client'
import React from "react";
import MessagesList from "./MessageList";
import { Chat } from "@/utils/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useUser } from "@/app/context/UserProvider";

interface ChatProps {
  readonly chatDetails?: Chat
  readonly userData?: User
}
type User = {
  _id: string;
  name: string;
  email: string;
};

const Chat: React.FC<ChatProps> = ({ chatDetails, userData }) => {
  const { logout, user: { email, isLoggedIn, name } } = useUser();

  return (
    <div  className="flex-grow p-4 ">
      <div className="flex flex-col h-screen">
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="flex gap-4">

            <h1 className="text-lg font-semibold">Acme Inc Chat</h1>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500 text-white pb-1">Online</Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">{userData?.email}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>

              <UserIcon className="h-6 rounded-full  hover:opacity-50 w-6" />


            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                  logout();
                }}>
                <LogOutIcon className="mr-2 h-4 w-4"   />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div hidden={!chatDetails} className="flex-1 overflow-auto p-4 md:p-6">
          <div className="space-y-4">
            <div className="flex items-end gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">John Doe</span>
                <p className="text-sm">Hello, how can I help you today?</p>
              </div>
              <div className="w-4 h-4 rounded-full bg-black" />
            </div>
            <div className="flex items-end gap-2 justify-end">
              <div className="w-4 h-4 rounded-full bg-gray-300" />
              <div className="flex flex-col gap-1 text-right">
                <span className="text-sm text-gray-500 dark:text-gray-400">You</span>
                <p className="text-sm">I have a question about my account.</p>
              </div>
            </div>
          </div>
        </div>
       {chatDetails && <footer  className="flex h-14 items-center gap-4 border-t px-6 dark:border-gray-800">
          <Input className="flex-1" placeholder="Type your message" />
          <Button>Send</Button>
        </footer>}
      </div>
    </div>

  );
};

export default Chat;

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
import { UserSkeleton } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import { getCurrentUser, getOtherUser } from "@/lib/utils";
import { MdAdd } from "react-icons/md";
import { MessageCircle, MessageCircleMore } from "lucide-react";
import { useSocket } from "@/app/context/SocketProvider";

const Sidebar = () => {
  const { socket } = useSocket();
  const [Toggle, setToggle] = useState(false);
  const [OnlineUsers, setOnlineUsers] = useState<object>({});
  const { Chats, setChats, getAuthCookie, setChat } = useUser();
  const [Loading, setLoading] = useState(true);
  const [SearchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const r = useRouter();
  const chatService = new ChatService(getAuthCookie());
  useEffect(() => {
    setLoading(true);
    chatService.getAllChats().then((data) => {
      const { chats } = data as { chats: Chat[] };

      setChats(chats);
      setLoading(false);
    });
  }, []);

  // filter chats on changing SearchTerm State with useMemo hook
  const filteredChats = React.useMemo(() => {
    if (SearchTerm.length === 0) {
      return Chats;
    }
    return Chats.filter((chat) =>
      chat.chatName.toLowerCase().includes(SearchTerm)
    );
  }, [SearchTerm, Chats]);

  function checkEmailExists(emails: string[]) {
    const isOnline = emails.some((email) => OnlineUsers.hasOwnProperty(email));
    console.log(isOnline, emails, OnlineUsers, " log");
    return isOnline;
  }
  useEffect(() => {
    // console.log(socket.connected);
    if (socket) {
      socket.on("onlineUsers", (onlineUsers) => {
        console.log(onlineUsers, " online Users hen ye");
        setOnlineUsers(onlineUsers || {}); // .on nhi challraha for online emit karny k bawajood due to the proper integeration on client-side, (always use context for sockets)
      });

      return () => {
        socket.off("onlineUsers");
      };
    }
  }, [socket]);

  function handleSelectChat(chat: Chat) {
    setChat(chat);
    r.push(`/chat/${chat._id}`);
  }
  return (
    <aside
      className={`bg-white relative shadow-sm ${!Toggle ? "w-1/4" : "w-0"}`}
    >
      <div
        onClick={() => setToggle((_) => !_)}
        className="bg-black w-4 h-4 rounded-full absolute -right-2.5 top-1/2 cursor-pointer hover:h-7 hover:top-[49%] transition-all"
      ></div>

      <div className={`flex flex-col h-full w-full`}>
        <div className="p-4">
          {!Toggle && (
            <div className="flex gap-1 flex-col">
              {" "}
              <Input
                value={SearchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full`}
                placeholder="Search contacts..."
              />
              <CreateNewChat
                triggerElem={
                  <div className="flex justify-center gap-3 items-center  text-white bg-black hover:bg-opacity-80 w-full px-3 py-2 rounded-md  bg-opacity-90 transition-all">
                    <span>New Chat</span>
                    <MessageCircleMore size={20} />
                  </div>
                }
              />
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          <h3 className="px-4 py-2 font-semibold text-gray-500 dark:text-gray-400">
            Recent Conversations
          </h3>
          <div className="divide-y pt-2 flex-col flex">
            {Loading ? (
              <>
                <div className="py-2 px-4 ">
                  <Skeleton className="w-[12rem] mb-1 h-[1.2rem] border-2" />
                  <Skeleton className="w-[4rem] h-[0.8rem]  border-2" />{" "}
                </div>
                <div className="py-2 px-4 ">
                  <Skeleton className="w-[12rem] mb-1 h-[1.2rem] border-2" />
                  <Skeleton className="w-[4rem] h-[0.8rem]  border-2" />{" "}
                </div>
              </>
            ) : filteredChats.length ? (
              filteredChats?.map((chat, idx) => {
                const { users } = chat;

                return (
                  <div key={idx} onClick={() => handleSelectChat(chat)}>
                    <UserCard
                      isOnline={
                        OnlineUsers &&
                        Object.keys(OnlineUsers).includes(
                          getOtherUser(chat.users).email
                        )
                      }
                      // isOnline={
                      //   !chat.isGroupChat
                      //     ? checkEmailExists(
                      //         users
                      //           .map((user) => {
                      //             return user.email;
                      //           })
                      //           .filter((email) => {
                      //             const currentUser = getCurrentUser()?.user;
                      //             return email !== currentUser?.email;
                      //           })
                      //       )
                      //     : false
                      // }
                      chat={chat}
                      className={
                        pathname === "/chat/" + chat._id
                          ? "ring-0 bg-gray-300"
                          : ""
                      }
                      chatType={
                        chat?.isGroupChat ? "Group-Chat" : "Private-Chat"
                      }
                      user={getOtherUser(users)}
                    />
                  </div>
                );
              })
            ) : SearchTerm.length === "" ? (
              <span className="text-gray-600 px-4  font-semibold text-sm">
                No Chats found with {"'"}
                {SearchTerm} {"'"}
              </span>
            ) : (
              <div className="flex text-gray-600 px-4 gap-2 font-semibold text-sm">
                <span>No Chats, </span>
                <CreateNewChat
                  triggerElem={
                    <span className="underline hover:no-underline text-black hover:text-gray-600">
                      Create One
                    </span>
                  }
                />
              </div>
            )}
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

"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Chat from "@/utils/interfaces/chat";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import { ArrowLeftIcon, LogOutIcon, UserIcon } from "lucide-react";
import { useUser } from "@/app/context/UserProvider";
import { useTheme } from "@/app/context/ThemeProvider";
import { IoMdExit, IoMdMore } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import UserCard from "./cards/UserCard";
import DropdownMenuComponent from "./shared/DropDownComponent";
import {
  getCurrentUser,
  isCurrentUserSender,
  truncateString,
} from "@/lib/utils";

import Link from "next/link";
import MessageCard from "./cards/MessageCard";
import { Message } from "@/utils/interfaces/message";
import MessageService from "@/services/messageService";
import { socket } from "@/utils/socket";
import { Socket } from "socket.io-client";
import { toast } from "sonner";
import Profile from "./Profile";
interface ChatProps {
  readonly chatDetails: Chat;
  readonly messagesData: Message[];
}

var mySocket: Socket, selectedChatCompare;

const ChatDetails: React.FC<ChatProps> = ({
  chatDetails,
  messagesData,
}: ChatProps) => {
  const { logout, Chat, getAuthCookie } = useUser();
  const { darkMode, toggleTheme } = useTheme();
  const [RenameText, setRenameText] = useState<string | "">(
    chatDetails.isGroupChat ? chatDetails.chatName : ""
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [MessageText, setMessageText] = useState("");
  const [Messages, setMessages] = useState<Message[] | []>(
    messagesData as Message[]
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollToBottom = () => {
    if (containerRef.current)
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  };
  const playSound = async () => {
    await audioRef?.current?.play();
    console.log("playing");
  };

  useEffect(() => {
    console.log(chatDetails, messagesData);
    scrollToBottom();
  }, [Messages]);

  useEffect(() => {
    mySocket = socket;
    mySocket.emit("joinChatRoom", chatDetails);
  }, [Chat]);

  useEffect(() => {
    socket.on("messageReceived", (data) => {
      playSound();
      setMessages((_) => [..._, JSON.parse(JSON.stringify(data?.message))]);
    });
    return () => {
      socket.off("messageReceived");
    };
  }, []);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentUser = getCurrentUser()?.user;

    const messageService = new MessageService(getAuthCookie());
    if (!currentUser) {
      // * Show Toast For temporing the logged-in userdata in the localstorage
      return;
    }

    let message: Message = {
      content: MessageText,
      sender: currentUser,
      chat: chatDetails as Chat,
    };

    socket.emit("newMessage", {
      message,
      chat: chatDetails as Chat,
    });

    setMessages((previousMessages: Message[]) => [
      ...previousMessages,
      message,
    ]);
    setMessageText("");
    messageService
      .createMessage(chatDetails?._id, MessageText)
      .then((_) => {
        console.log("message sent successfuly");
      })
      .catch((err: unknown) => {
        console.log("error occured while sending message", err);
      });
  };

  return (
    <div className="flex-grow p-4 ">
      <audio ref={audioRef} src="/sound.mp3" />
      <div className="flex flex-col h-full">
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="flex gap-4">
            <Link href={"/chat"}>
              <Button className=" rounded-full">
                <ArrowLeftIcon size={20} />
              </Button>
            </Link>
            {/* <span>{}</span> */}
            <h1 className="text-lg font-semibold"></h1>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500 text-white pb-1">Online</Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {/* {userData?.email} */}
              </span>
            </div>
          </div>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger>
                {" "}
                <UserIcon
                  size={26}
                  className="hover:opacity-60 transition-all"
                />{" "}
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle className="pb-2 font-bold text-3xl text-center">
                    User Profile
                  </DialogTitle>
                  <DialogDescription className="">
                    {" "}
                    <Profile
                      name={getCurrentUser()?.user.name ?? ""}
                      email={getCurrentUser()?.user.email ?? ""}
                      photoUrl={getCurrentUser()?.user.profile ?? ""}
                      key={2}
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                {" "}
                <IoMdMore
                  size={26}
                  className="hover:opacity-60 transition-all"
                />{" "}
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle className="pb-2">
                    Chat Configuration:{" "}
                    {chatDetails.isGroupChat ? "Group" : "Private"}
                  </DialogTitle>
                  <DialogDescription className="">
                    {chatDetails.isGroupChat && (
                      <div className="py-5 flex gap-2 items-start">
                        <Input
                          onChange={(e) => setRenameText(e.target.value)}
                          value={RenameText}
                          placeholder="Enter Text To Rename Group"
                        />
                        <Button
                          disabled={
                            !RenameText.length ||
                            chatDetails.chatName === RenameText
                          }
                        >
                          Rename
                        </Button>
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      {chatDetails.isGroupChat ? (
                        <h1>
                          <span className="">Group Admin:</span>{" "}
                          <Badge>{chatDetails.groupAdmin.email} </Badge>
                        </h1>
                      ) : null}

                      <h2 className=" px-1"> Members</h2>
                      <div className="">
                        {chatDetails?.users?.map((_) => {
                          const isUserAnAdmin = chatDetails.isGroupChat
                            ? _._id === chatDetails.groupAdmin._id
                            : null;

                          return (
                            <UserCard
                              className="hover:bg-gray-200 active:bg-none"
                              user={_}
                            >
                              {chatDetails.isGroupChat ? (
                                <DropdownMenuComponent
                                  triggerText={
                                    <IoMdMore
                                      size={26}
                                      className="hover:opacity-40 transition-all"
                                    />
                                  }
                                  items={[
                                    { type: "label", text: "Edit User" },
                                    { type: "separator" },
                                    {
                                      type: "item",
                                      text: isUserAnAdmin
                                        ? "Exit Group"
                                        : "Remove " +
                                          truncateString(_.email, 8, "..."),
                                      icon: <IoMdExit size={20} />,
                                    },
                                    // @ts-ignore
                                    {
                                      ...(!isUserAnAdmin
                                        ? {
                                            type: "item",
                                            text: "Make Admin",
                                            icon: <UserIcon size={20} />,
                                          }
                                        : null),
                                    },
                                  ]}
                                />
                              ) : null}
                            </UserCard>
                          );
                        })}
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button className="rounded-full" onClick={() => logout()}>
              <LogOutIcon />
            </Button>
          </div>
        </header>

        <div
          className="flex-1 overflow-auto p-4 md:p-6"
          id="p"
          ref={containerRef}
        >
          <div className="space-y-4 messagesContainer" id="p2">
            {Messages &&
              Messages?.map((m) => (
                <MessageCard
                  sender={m.sender.email}
                  message={m}
                  isSender={isCurrentUserSender(m.sender._id)}
                />
              ))}
          </div>
        </div>
        {chatDetails && (
          <form
            onSubmit={handleSendMessage}
            className="flex h-14 items-center gap-4 border-t px-6 dark:border-gray-800"
          >
            <Input
              value={MessageText}
              onChange={(e) => setMessageText(e.currentTarget.value)}
              className="flex-1"
              placeholder="Type your message"
            />
            <Button>Send</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatDetails;

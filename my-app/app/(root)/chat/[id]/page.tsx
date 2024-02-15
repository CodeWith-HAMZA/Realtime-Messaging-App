import { useUser } from "@/app/context/UserProvider";
import ChatDetails from "@/components/ChatDetails";
import ChatService from "@/services/chatService";
import MessageService from "@/services/messageService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";
import { ImSpinner8 } from "react-icons/im";

export default async function page({ params }) {
  const chatId: string = params.id;

  const messageService = new MessageService(
    cookies()?.get("Authorization")?.value as string
  );
  const chatService = new ChatService(
    cookies()?.get("Authorization")?.value as string
  );

  try {
    const chatData = await chatService.getChatById(chatId);

    const messagesData = await messageService.getMessagesForChat(chatId);
    console.log(chatData);
    return chatData && messagesData ? (
      <ChatDetails chatDetails={chatData} messagesData={messagesData} />
    ) : null;
    // <div className="flex justify-center items-center w-[80%]">
    //   <ImSpinner8 className=" animate-spin" size={100} />
    // </div>
  } catch (error) {
    redirect("/auth/login");
  }
}

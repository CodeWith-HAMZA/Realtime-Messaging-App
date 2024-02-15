import { useUser } from "@/app/context/UserProvider";
import ChatDetails from "@/components/ChatDetails";
import ChatService from "@/services/chatService";
import MessageService from "@/services/messageService";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import React from "react";
import { ImSpinner8 } from "react-icons/im";

export default async function page({ params }) {
  const chatId = params.id;

  const messageService = new MessageService(
    cookies()?.get("Authorization")?.value as string
  );
  const chatService = new ChatService(
    cookies()?.get("Authorization")?.value as string
  );

  try {
    const data = await chatService.getChatById(chatId);

    const messagesData = await messageService.getMessagesForChat(chatId);
    console.log(data);
    return data && messagesData ? (
      <ChatDetails chatDetails={data} messagesData={messagesData} />
    ) : (
      <div className="flex justify-center items-center w-[80%]">
        <ImSpinner8 className=" animate-spin" size={100} />
      </div>
    );
  } catch (error) {
    redirect("/auth/login");
  }
}

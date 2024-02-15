import Chat from "@/components/ChatDetails";
import UserService from "@/services/userServices";
import { MessageCircleIcon } from "lucide-react";
import { cookies } from "next/headers";
import React from "react";

export default function page() {
  // * Home page, it's rendered, when no chat is selected or opened by the user
  return (
    <>
      {" "}
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center">
          <MessageCircleIcon className="text-gray-300 mb-4 h-24 w-24" />
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold text-gray-600">
              No Chat Selected
            </h2>
            <p className="text-gray-500">
              Choose a conversation to start chatting.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

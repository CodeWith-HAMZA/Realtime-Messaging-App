import React from "react";
import MessagesList from "./MessageList";
import InputBox from "./InputBox";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  return (
    <>
      <main className="flex-grow p-4 ">
        <ChatHeader />

        <MessagesList />
        <InputBox />
      </main>
    </>
  );
};

export default Chat;

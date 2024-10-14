"use client";
import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { ImAttachment } from "react-icons/im";
import { Button } from "../ui/button";
interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  MessageText: string;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
  setToggleFilesModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function MessageForm({
  onSubmit,
  MessageText,
  setMessageText,
  setToggleFilesModal,
}: Props) {
  return (
    <form
      className="flex h-14 items-center gap-4 border-t px-6 dark:border-gray-800"
      onSubmit={onSubmit}
    >
      <Input
        value={MessageText}
        onChange={(e) => setMessageText(e.currentTarget.value)}
        className="flex-1"
        placeholder="Type your message"
      />
      <Button
        type="button"
        variant={"outline"}
        onClick={() => setToggleFilesModal((_) => !_)}
        size="icon"
      >
        <ImAttachment />
      </Button>
      <Button type="submit">Send</Button>
    </form>
  );
}

export default MessageForm;

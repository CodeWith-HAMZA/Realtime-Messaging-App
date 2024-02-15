import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/utils/interfaces/user";
import Chat from "@/utils/interfaces/chat";
import { Button } from "../ui/button";
import { truncateString } from "@/lib/utils";

interface UserCardProps {
  readonly user: User;
  readonly chatType?: "Group-Chat" | "Private-Chat";
  readonly className: string;
  readonly chat?: Chat;
  readonly children?: ReactNode;
}

const UserCard: React.FC<UserCardProps> = ({
  chatType = null,
  user,
  className,
  chat,
  children,
}) => {
  return (
    <div
      className={`flex justify-between px-4 m-0.5 cursor-pointer py-2 hover:bg-opacity-70 dark:hover:bg-opacity-70 active:bg-gray-200 dark:active:bg-gray-200 ring-black rounded-md transition-all border-t ${className}`}
    >
      <div className="flex items-center gap-4 ">
        <Avatar className="h-9 w-9">
          <AvatarImage alt="@johndoe" src="/placeholder-avatar.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 ">
          <span className="text-xs text-green-700 dark:text-green-400">
            {chatType}
          </span>
          <h2 className="text-md font-semibold truncate dark:text-500 text-gray-700 dark:text-gray-100">
            {truncateString(
              chatType === "Group-Chat"
                ? (chat?.chatName as string)
                : user?.name,
              16,
              "..."
            )}
          </h2>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {chatType === "Private-Chat" || chatType === null
              ? truncateString(user?.email, 16, "...")
              : chat?.users.length + " Members"}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default UserCard;

import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/utils/interfaces/user";
import Chat from "@/utils/interfaces/chat";
import { Button } from "../ui/button";
import { millisecondsToDate, truncateString } from "@/lib/utils";
import { placeHolderImage } from "@/utils/constants";

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
  console.log(user, "USER HE YE");
  return (
    <div
      className={`flex justify-between px-4 m-0.5 cursor-pointer py-2 hover:bg-opacity-70 dark:hover:bg-opacity-70 active:bg-gray-200 dark:active:bg-gray-200 ring-black rounded-md transition-all border-t ${className}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-3 items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              alt="@johndoe"
              src={user?.profile || placeHolderImage}
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 ">
            <p className="text-xs text-gray-500 truncate dark:text-gray-400">
              {chatType === "Private-Chat" || chatType === null
                ? truncateString(user?.email, 16, "...")
                : chat?.users.length + " Members"}
            </p>
            <h2 className="text-md font-semibold truncate dark:text-500 text-gray-700 dark:text-gray-100">
              {truncateString(
                chatType === "Group-Chat"
                  ? (chat?.chatName as string)
                  : user?.name,
                16,
                "..."
              )}
            </h2>

            {chatType && (
              <p className="space-x-2 text-gray-500 truncate dark:text-gray-400">
                <span className="text-sm text-gray-600 font-semibold">
                  {truncateString(
                    chat?.latestMessage?.sender?.email ?? "",
                    4,
                    "... :"
                  ) ?? ""}
                </span>
                <span className="text-sm">
                  {chat?.latestMessage?.content ?? ""}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs text-green-700">{chatType}</p>
          <p hidden={chatType === null} className="text-neutral-500 text-xs">
            {millisecondsToDate(
              chat?.latestMessage?.createdAt
                ? chat?.latestMessage?.createdAt
                : ""
            )}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default UserCard;

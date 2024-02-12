import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/utils/interfaces/user";

interface UserCardProps {
  readonly user: User;
  readonly status: string;
  readonly className: string;
}

const UserCard: React.FC<UserCardProps> = ({ status, user, className }) => {
  return (
    <div
      className={`px-4 m-0.5 cursor-pointer py-2 hover:bg-opacity-70 dark:hover:bg-opacity-70 active:bg-gray-300 dark:active:bg-gray-600 ring-black rounded-md transition-all border-t ${className}`}
    >
      <div className="flex items-center gap-4 ">
        <Avatar className="h-9 w-9">
          <AvatarImage alt="@johndoe" src="/placeholder-avatar.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 ">
          <span className="text-xs text-green-700 dark:text-green-400">
            (Online)
          </span>
          <h2 className="text-sm font-medium truncate dark:text-500 text-gray-500">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

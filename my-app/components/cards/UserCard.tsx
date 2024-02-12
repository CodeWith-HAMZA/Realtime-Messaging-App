import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/utils/types";

interface UserCardProps {
  readonly user: User;
  readonly status: string;
  readonly className: string;
}

const UserCard: React.FC<UserCardProps> = ({ status, user, className }) => {
  return (
    <div
      className={`px-4 m-0.5 cursor-pointer py-2 hover:bg-opacity-70   active:bg-gray-300 ring-black rounded-md transition-all border-t ${className}`}
    >
      <div className="flex items-center gap-4 ">
        <Avatar className="h-9 w-9">
          <AvatarImage alt="@johndoe" src="/placeholder-avatar.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 ">
          <span className="text-xs text-green-700">(Online)</span>
          <h2 className="text-sm font-medium truncate">{user.name}</h2>

          <p className="text-sm text-gray-500 truncate">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

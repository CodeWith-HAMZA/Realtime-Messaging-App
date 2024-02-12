"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import UserCard from "./cards/UserCard";
import { Skeleton } from "./ui/skeleton"; 
import { User } from "@/utils/types";
import { Input } from "./ui/input";
import UserService from "@/services/userServices";
import { useUser } from "@/app/context/UserProvider";
import { Button } from "./ui/button";
import { truncateString } from "@/lib/utils";
import ChatService from "@/services/chatService";
import { toast } from "sonner";

interface AllUsersProps {}

const skeleton = (
  <div className="px-4 py-2">
    {[0, 0, 0, 0, 0].map((_) => (
      <div className="py-2">
        <Skeleton className="w-[16rem] mb-1 h-[1.2rem] border-2" />
        <Skeleton className="w-[4rem] h-[0.8rem]  border-2" />
      </div>
    ))}
  </div>
);

const AllUsers: React.FC<AllUsersProps> = ({}) => {
  const [SelectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [Query, setQuery] = useState("");
  const [Users, setUsers] = useState<User[] | []>([]);
  const [Loading, setLoading] = useState(true);
  const { getAuthCookie } = useUser();

  // Function to debounce the fetchUsers function
  const debounce = <F extends (...args: any[]) => any>(
    func: F,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<F>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };
  const fetchUsers = debounce(async () => {
    setLoading(true);
    const userService = new UserService(getAuthCookie());
    const { users } = await userService.searchUsers(Query);

    setLoading(false);
    setUsers(users);
  }, 400);
  useEffect(fetchUsers, [Query]);

  function removeUserFromSelection(user: User) {
    setSelectedUsers((_) => _.filter((_) => _._id !== user._id));
  }
  function addToSelectedUsers(user: User) {
    const isSuggestionExistsInPills = SelectedUsers.find(
      (_) => _._id === user._id
    );

    if (isSuggestionExistsInPills) removeUserFromSelection(user);
    else setSelectedUsers((selectedUsers) => [...selectedUsers, user]);
  }
  const isUserSelected = (user: User) =>
    SelectedUsers.some((u) => u._id === user._id);

  const userList = Users.length ? (
    Users.map((user) => (
      <div
        key={user._id} // Assuming each user has a unique identifier
        className={`px-4 m-0.5 cursor-pointer py-2 hover:bg-opacity-70  active:ring-1 active:bg-gray-300 ring-black rounded-md transition-all border-t ${
          isUserSelected(user) ? "ring-2 bg-gray-300" : ""
        }`}
        onClick={() => {
          addToSelectedUsers(user);
        }}
      >
        <UserCard status="Online" user={user} />
      </div>
    ))
  ) : (
    <p className="px-4 text-lg">
      No Users Exists Having{" "}
      <span className="font-bold text-xl">"{Query}"</span>
    </p>
  );

  let content = Loading ? skeleton : userList;

  async function createNewChat() {
    console.log("create chat");
    const chatService = new ChatService(getAuthCookie());

    if (SelectedUsers.length === 1) {
      setLoading(true);
      const data = await chatService.accessChat(SelectedUsers[0]._id || "");
      setLoading(false);
      console.log(data);
      toast.success(data.message as string);
    }
  }
  return (
    <>
      <div className="px-4 py-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {SelectedUsers.map((user) => (
            <div className="flex gap-2 border-2 border-gray-300 shadow-sm rounded-full px-4 pb-1 hover:bg-gray-100 cursor-pointer ">
              <span>{truncateString(user.name)}</span>{" "}
              <span
                className="hover:text-gray-500"
                onClick={() => removeUserFromSelection(user)}
              >
                {" "}
                x
              </span>
            </div>
          ))}
        </div>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}
          className="w-full"
          placeholder="Search contacts..."
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">Contacts</h2>
        </div>
        <div className="h-[30vh] overflow-y-scroll flex flex-col gap-1">
          {content}
        </div>
      </div>
      <div className="px-4 py-2 border-t">
        <Button
          onClick={createNewChat}
          disabled={!SelectedUsers.length || Loading}
          className="w-full"
        >
          {SelectedUsers.length > 1 ? (
            <div className="flex gap-2">
              <span>New Group Chat</span>
               
              <HiMiniUserGroup size={21} />{" "}
            </div>
          ) : (
            <div className="flex gap-2">
              <span>New Chat</span>
              <FaUserGroup size={18} />
            </div>
          )}
        </Button>
      </div>
    </>
  );
};

export default AllUsers;

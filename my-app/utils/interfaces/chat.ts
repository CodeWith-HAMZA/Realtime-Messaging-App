import { User } from "./user";

interface GroupChat {
  isGroupChat: true;
  users: User[];
  _id: string;
  chatName: string;
  groupAdmin: User;
}

interface IndividualChat {
  isGroupChat: false;
  users: User[];
  _id: string;
  chatName: string;
}

type Chat = GroupChat | IndividualChat;

export default Chat;

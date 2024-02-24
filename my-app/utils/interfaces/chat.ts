import { Message } from "./message";
import { User } from "./user";

interface GroupChat {
  isGroupChat: true;
  groupAdmin: User;
}

interface IndividualChat {
  isGroupChat: false;
}

type Chat = (GroupChat | IndividualChat) & {
  users: User[];
  _id: string;
  latestMessage: Message;
  chatName: string;
  createdAt: Date;
  updatedAt: Date;
};

export default Chat;

import Chat from "./chat";
import { User } from "./user";

export interface Message {
  _id: string;
  chat: Chat; // Assuming chat is of type Chat
  sender: User; // Assuming sender is of type User
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

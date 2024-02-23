import Chat from "./chat";
import { User } from "./user";

export interface Message {
  _id?: string;
  chat: Chat;
  sender: User;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

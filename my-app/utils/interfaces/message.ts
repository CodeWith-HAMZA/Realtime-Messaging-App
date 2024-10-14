import Chat from "./chat";
import Media from "./media";
import { User } from "./user";

export interface Message {
  _id?: string;
  chat: Chat;
  sender: User;
  content: string;
  media: Media[];
  createdAt?: Date;
  updatedAt?: Date;
}

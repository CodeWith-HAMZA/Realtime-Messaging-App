import ChatRoom from "@/components/ChatRoom";
import Image from "next/image";
import ClientTest from "./ClientTest";

export default function Home() {
  return (
    <div className="">
      {" "}
      <ChatRoom></ChatRoom>
      <ClientTest />
    </div>
  );
}

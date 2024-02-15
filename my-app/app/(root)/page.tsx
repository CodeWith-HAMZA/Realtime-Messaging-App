import Chat from "@/components/ChatDetails";
import UserService from "@/services/userServices";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  

  return (
    <Link href={"/chat"}>Goto Chat</Link>
  );
}

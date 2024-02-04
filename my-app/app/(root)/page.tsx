import Chat from "@/components/Chat";
import Link from "next/link";
 
export default function Home() {
  return (
 <Link href={"/chat"}>Goto Chat</Link>
  );
}

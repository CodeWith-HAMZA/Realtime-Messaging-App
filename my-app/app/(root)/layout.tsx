import Sidebar from "@/components/SideBar";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StoreProvider } from "../providers";
import UserProvider, { UserContext } from "../context/UserProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <main className="font-sans bg-gray-100 h-screen flex">
            <Sidebar />
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}

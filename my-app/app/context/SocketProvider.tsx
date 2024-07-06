"use client";
import { getCurrentUser } from "@/lib/utils";
import { URL } from "@/utils/socket";
// src/context/SocketContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocket = (): ISocketContext => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(URL as string); // Replace with your server URL

    newSocket.on("connect", () => {
      const currentUser = getCurrentUser()?.user;
      if (currentUser) {
        newSocket.emit("onlineUser", {
          email: currentUser?.email,
          userId: currentUser?._id,
        });
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

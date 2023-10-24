"use client";
import React, { useEffect, useState } from "react";

let i = 0;
const ClientTest = () => {
  const [Socket, setSocket] = useState<WebSocket | null>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setSocket(socket);
    socket.addEventListener("open", () => {
      console.log("Connected to WebSocket server");
    });

    socket.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
    });
  }, []);
  function handleMessage() {
    Socket?.send("wah bete moj krdi" + i);
  }
  return (
    <button onClick={handleMessage}>
      {/* Your component JSX */}client test
    </button>
  );
};

export default ClientTest;

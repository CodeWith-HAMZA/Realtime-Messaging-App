"use client";
import React, { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.addEventListener("message", (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const socket = new WebSocket("ws://localhost:8080");
    socket.send(inputValue);
    setInputValue("");
  };

  return (
    <div className="App">
      <h1>Chat App</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;

"use client";
import React, { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

 


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("first")

  }


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
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;

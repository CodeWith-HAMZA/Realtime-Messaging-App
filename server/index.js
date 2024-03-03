const express = require("express");
const http = require("http");
const connectToDB = require("./db/connectToMongo");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const chatRoutes = require("./routes/chat.route");
const messageRoutes = require("./routes/message.route");
const { Server } = require("socket.io");

class ChatApp {
  // * connected-Sockets in the application
  onlineUsers = new Set();
  constructor(port) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: { origin: "*" },
      pingTimeout: 50 * 1000, // 50 secs
    }); // Enable CORS

    this.connectToDatabase();
    this.configureMiddlewares();
    this.defineRoutes();
    this.startRealtimeCommunication();
    this.startServer(port); // Moved here for convenience
  }

  async connectToDatabase() {
    try {
      await connectToDB(); // Assume function for connection
      console.log("Successfully Connected To Mongo-Database");
    } catch (err) {
      throw new Error("Error connecting to MongoDB: " + err.message);
    }
  }

  configureMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: "*" })); // Consider restricting origins in production
  }

  defineRoutes() {
    this.app.use("/api/user", userRoutes);
    this.app.use("/api/chat", chatRoutes);
    this.app.use("/api/message", messageRoutes);
  }

  startRealtimeCommunication() {
    this.io.on("connection", (socket) => {
      // socket.join() would join room (implement room logic as needed)
      console.log("A user connected with " + socket.id);

      // * Keep adding the sockets/client/users, when ever the client/user/socket connects Real-Time Connection to the server
      this.onlineUsers.add(socket.id);

      // Send updated online users list to all clients
      this.io.emit("onlineUsers", Array.from(this.onlineUsers));

      // * Setting the user to the room, & emmiting the 'connected' event
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData);

        socket.emit("connected");
      });

      // * joining the user to the chat room, when we click any of the chat on the client-side

      socket.on("joinChatRoom", (chatRoomData) => {
        // Using Chat-Id as room's unique-name
        const chatId = chatRoomData._id;

        socket.join(chatId);

        // * according to me from chatgpt, chatRoomData there must be the roomId, through which the current socket will be joined in the room
        console.log("Joined The Chat Room, with chat-id " + chatRoomData._id);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");

        // Remove user from online users set
        this.onlineUsers.delete(socket.id);

        // Send updated online users list to all clients
        this.io.emit("onlineUsers", Array.from(this.onlineUsers));
      });

      socket.on("newMessage", ({ message, chat }) => {
        // Broadcast the message to all sockets in the room
        // io.to(roomId).emit("message", message);
        socket.to(chat._id).emit("messageReceived", { message, chat });
      });
      // Server-side code
    });
  }

  startServer(port) {
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

// Initialize and run the ChatApp instance
module.exports = app = new ChatApp(process.env.PORT || 4000);

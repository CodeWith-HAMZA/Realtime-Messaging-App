const express = require("express");
const http = require("http");
const connectToDB = require("./db/connectToMongo");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const chatRoutes = require("./routes/chat.route");
const messageRoutes = require("./routes/message.route");
const { Server } = require("socket.io");
const { deleteKeyValuePairByValue } = require("./utils");

class ChatApp {
  // * connected-Sockets in the application
  connectedUsers = {};
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
  // Add a user to the connectedUsers object
  addUser(userId, socketId) {
    this.connectedUsers[userId] = socketId;
  }
  // Remove a user from the connectedUsers object
  removeUser(userId) {
    delete this.connectedUsers[userId];
  }
  removeUserBySocketId(socketId) {
    deleteKeyValuePairByValue(this.connectedUsers, socketId);
  }
  // Check if a user is already connected
  isUserConnected(userId) {
    return this.connectedUsers.hasOwnProperty(userId);
  }
  // Get the socket ID for a specific user
  getSocketId(userId) {
    return this.connectedUsers[userId];
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

      // EMIT THE EVENT FROM CLIENT-SIDE
      socket.on("onlineUser", ({ email, userId }) => {
        console.log(email, userId, " ONLINE_USER emited");

        // * adding new-user to the local-obj
        this.addUser(email, socket.id);

        // * updating client-side on joining the new-user to the socket-connection
        this.io.emit("onlineUsers", this.connectedUsers); // LISTEN EVENT ON CLIENT-SIDE
        // socket.emit("onlineUsers", this.connectedUsers); // LISTEN EVENT ON CLIENT-SIDE
      });

      // * Keep adding the sockets/client/users, when ever the client/user/socket connects Real-Time Connection to the server
      // this.onlineUsers.add(socket.id);

      // Send updated online users list to all clients
      // this.io.emit("onlineUsers", Array.from(this.onlineUsers));

      // * Setting the user to the room, & emmiting the 'connected' event

      // * joining the user to the chat room, when we click any of the chat on the client-side

      socket.on("joinChatRoom", (chatRoomData) => {
        console.log("chat joined bhaiya");
        // Using Chat-Id as room's unique-name
        const chatId = chatRoomData?._id || "";

        if (chatId === "") {
          throw new Error("Chat Id not found while joining the chat-room");
        }

        socket.join(chatId);

        // * according to me from chatgpt, chatRoomData there must be the roomId, through which the current socket will be joined in the room
        console.log("Joined The Chat Room, with chat-id " + chatRoomData._id);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");

        // Remove user from online users set
        // this.onlineUsers.delete(socket.id);
        this.removeUserBySocketId(socket.id);
        // * updating client-side on joining the new-user to the socket-connection
        this.io.emit("onlineUsers", this.connectedUsers); // LISTEN EVENT ON CLIENT-SIDE

        console.log(this.connectedUsers, " connected users hen ye");
      });

      socket.on("newMessage", ({ message, chat }) => {
        // Broadcast the message to all sockets in the room
        // io.to(roomId).emit("message", message);

        const roomId = chat._id;
        socket.to(roomId).emit("messageReceived", { message, chat });
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

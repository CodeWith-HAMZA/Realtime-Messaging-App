const express = require("express");
const http = require("http");
const connectToDB = require("./db/connectToMongo");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const chatRoutes = require("./routes/chat.route");
const messageRoutes = require("./routes/message.route");
const { Server } = require("socket.io");

class ChatApp {
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

      socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData);
        socket.emit("connected");
      });

      socket.on("joinChatRoom", (chatRoomData) => {
        socket.join(chatRoomData);
      });
      // Handle socket events (e.g., chat messages, join/leave rooms)
      socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
        // You can perform cleanup actions here, like removing the user from rooms
        // or updating their online status, if applicable.
      });
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

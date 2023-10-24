const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const connectToDB = require("./db/connectToMongo");
const cors = require("cors");
const ws = require("ws");

const app = express();
const server = http.createServer(app);

// Add your middleware and routes here

connectToDB();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  return res.json({ u: "he" });
});

const PORT = process.env.PORT || 4000;

const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const wsServer = new ws.WebSocketServer({ server: httpServer });
const wsServer2 = new ws.Server({ port: 8080 });

wsServer.on("connection", (ws) => {
  console.log("connected to server1");
  ws.send("msg from server");

  ws.on("message", (message) => {
    console.log("Received Message From Client: ", message.toString());
    ws.send(
      "Client, yar jani q tang karrhy ho mjh msg bhej bhej kr?? jani khayal kro yar mein bichara server hun, local pr bhi saans nhi lene derahy ho? ye lo tumhara tohfa apny paas heee rakho, " +
        message.toString("utf-8")
    );
  });
});
wsServer2.on("connection", (ws) => {
  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

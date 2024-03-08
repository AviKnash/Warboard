const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { setupListeners } = require("./listeners");

app.use(cors());
const server = http.createServer(app);
const PORT = "3001";

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setupListeners(io)

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("recieve_message",data)
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { setupListeners } = require("./listeners.ts");

app.use(cors());
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setupListeners(io)

server.listen(PORT,"0.0.0.0", () => console.log(`Server is running on port ${PORT}`));


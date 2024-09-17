import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { setupListeners } from "./listeners";


const app = express()
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

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path'

const app = express();

const server = createServer(app);

app.use(express.static(path.join(__dirname, "..", "public")))

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected", socket);
});

export {server, io}

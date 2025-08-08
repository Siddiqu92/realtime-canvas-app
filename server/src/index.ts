import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Frontend ka URL dalen agar specific chahiye
    methods: ["GET", "POST"]
  }
});

type Rectangle = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

let rectangles: Rectangle[] = [];

io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Send existing rectangles to new client
  socket.emit("rectangle:init", rectangles);

  // New Rectangle Added
  socket.on("rectangle:add", (rect: Rectangle) => {
    rectangles.push(rect);
    io.emit("rectangle:added", rect); // broadcast to all
  });

  // Rectangle Moved
  socket.on("rectangle:move", (data: { id: string; x: number; y: number }) => {
    rectangles = rectangles.map((r) =>
      r.id === data.id ? { ...r, x: data.x, y: data.y } : r
    );
    socket.broadcast.emit("rectangle:moved", data); // send to others except sender
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

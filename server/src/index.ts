/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import examplesRouter from "./routes/examples";
import path from "path";
import { Socket, Server } from "socket.io";
import { generateId } from "./utils";
import { createServer } from "http";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3001;
const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/wec2021";
const CLIENT_BUILD_RELATIVE_PATH = "../../client/build";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  "/static",
  express.static(path.join(__dirname, CLIENT_BUILD_RELATIVE_PATH + "/static"))
);

const server = createServer(app);
// TODO: fix importing style
const io = require("socket.io")(server) as Server;

try {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
} catch (err) {
  console.log(err);
}

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/examples", examplesRouter);

io.on("connection", (socket: Socket) => {
  console.log("Connected succesfully to the socket ...");
  // Example: Send news on the socket
  socket.emit("news", "Hello, world");

  // Creating a game
  socket.on("game/create", () => {
    console.log(`User ${socket.id} created a game`);
    // the new user, generate random room id
    const roomId = generateId(4);

    // const user = { id: s.id, roomId };
    console.log(`${socket.id} user has create and joined room ${roomId}`);

    socket.join(roomId);

    // emit an notification that the game (lobby) was created successfully with the game code.
    io.to(roomId).emit("game/success", { code: roomId });
  });

  // Joining a game using a game code
  socket.on("game/join", (code: string) => {
    console.log(`User ${socket.id} is to joining ${code}`);
    socket.join(code);
    socket.emit("game/success", { code });
  });

  // a basic ping that pings the entire lobby
  socket.on("game/ping", (msg: string) => {
    console.log(msg);
    io.to(socket.rooms).emit("game/pong", { msg });
  });

  // Leaving a game
  // TODO
  socket.on("game/leave", (s: Socket) => {
    console.log(`User ${s.id} left the game`);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, CLIENT_BUILD_RELATIVE_PATH, "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

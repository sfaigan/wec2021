/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { Socket, Server } from "socket.io";
import { createServer } from "http";
import { getGamesRouter } from "./routes/games";

dotenv.config();

const PORT = process.env.SERVER_PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "development";
const DB_URI =
  NODE_ENV === "production"
    ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`
    : "mongodb://127.0.0.1:27017/wec2021";
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

app.use("/api/games", getGamesRouter(io));

io.on("connection", (socket: Socket) => {
  console.log("Connected succesfully to the socket ...");
  // Example: Send news on the socket
  socket.emit("news", "Hello, world");

  // Joining a game using a game code
  socket.on("game/join", (code: string) => {
    console.log(`User ${socket.id} is to joining ${code}`);
    socket.join(code);
    socket.emit("game/success", { code });
  });

  // a basic ping that pings the entire lobby
  socket.on("game/ping", (msg: string) => {
    console.log(msg);
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

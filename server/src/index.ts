/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { Socket, Server } from "socket.io";
import { createServer } from "http";
import { getGamesRouter } from "./routes/games";
import { Colour } from "./constants";
import { Game, GameDoc } from "./models/game";
import { generateBoard } from "./utils/board";
import { MoveRequest } from "./types";

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

  socket.on("game/create", async (size: number) => {
    console.log("game/create");
    const board = generateBoard(size);
    const turn = Colour.WHITE;
    const game = new Game({ board, turn });
    try {
      const result = await game.save();
      const roomId = result._id;
      // join the game
      socket.join(roomId);

      // emit a notification that the game (lobby) was created successfully with the game code.
      io.to(roomId).emit("game/success", { code: roomId, game: result });
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("game/update", async (move: MoveRequest, id: string) => {
    try {
      // grab the game via id
      const game = (await Game.findById(id)) as GameDoc;

      console.log(move, id);
      // do updates

      // save

      // emit results to clients
      io.to(id).emit("game/update", { game: game });
    } catch (error) {
      console.error(error);
    }
  });

  // Joining a game using a game code
  socket.on("game/join", async (id: string) => {
    console.log(`User ${socket.id} is to joining ${id}`);
    try {
      const game = await Game.findById(id);
      if (game) {
        socket.join(id);
        io.to(id).emit("game/success", { code: id, game });
      }
    } catch (error) {
      console.error(error);
    }
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

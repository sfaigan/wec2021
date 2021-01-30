import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as http from "http";
import examplesRouter from "./routes/examples";
import path from "path";
import { Socket } from "socket.io";

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

const server = new http.Server(app);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const io = require("socket.io")(server);

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

  const news = [
    {
      title: "The cure of the Sadness is to play Videogames",
      date: "04.10.2016",
    },
    {
      title: "Batman saves Racoon City, the Joker is infected once again",
      date: "05.10.2016",
    },
    {
      title: "Deadpool doesn't want to do a third part of the franchise",
      date: "05.10.2016",
    },
    {
      title:
        "Quicksilver demand Warner Bros. due to plagiarism with Speedy Gonzales",
      date: "04.10.2016",
    },
  ];

  // Send news on the socket
  socket.emit("news", news);

  socket.on("my other event", (data) => {
    console.log(data);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, CLIENT_BUILD_RELATIVE_PATH, "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import examplesRouter from "./routes/examples";
import path from "path";

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, CLIENT_BUILD_RELATIVE_PATH, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

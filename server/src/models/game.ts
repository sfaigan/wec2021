import { model, Schema, Document } from "mongoose";
import { Board, BoardSchema } from "./board";

export interface GameDoc extends Document {
  board: Board;
  turn: string;
}

const GameSchema = new Schema({
  board: BoardSchema,
  turn: {
    type: String,
    enum: ["white", "black"],
  },
});

export const Game = model<GameDoc>("Game", GameSchema);

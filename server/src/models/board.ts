import { Schema } from "mongoose";

export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  pieceType: string;
  position: Position;
  colour: string;
}

interface Square {
  piece: Piece;
  colour: string;
}

const SquareSchema = new Schema(
  {
    piece: {
      pieceType: String,
      position: {
        x: Number,
        y: Number,
      },
      colour: {
        type: String,
        enum: ["white", "black"],
      },
    },
    colour: {
      type: String,
      enum: ["white", "black"],
    },
  },
  { _id: false, versionKey: false }
);

export interface Board {
  size: number;
  squares: Square[][];
}

export const BoardSchema = new Schema(
  {
    size: Number,
    squares: [[SquareSchema]],
  },
  { _id: false, versionKey: false }
);

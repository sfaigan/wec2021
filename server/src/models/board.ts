import { Schema } from "mongoose";

export interface Piece {
  pieceType: string;
  colour: string;
}

export interface Square {
  piece?: Piece;
  colour: string;
}

const SquareSchema = new Schema(
  {
    piece: {
      required: false,
      pieceType: String,
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

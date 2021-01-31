import { Piece } from "./models/board";

export type Position = {
  x: number;
  y: number;
};

export interface MoveRequest {
  currentPos: { x: number; y: number };
  newPos: { x: number; y: number };
  piece: Piece;
}

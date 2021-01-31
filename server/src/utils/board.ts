/* eslint-disable import/namespace */
import { Board, Piece, Square } from "../models/board";
import { BOARD_8, Colour, PieceType, TEST } from "../constants";
import { Position } from "../types";
import { move } from "./moves";

export const generateBoard = (size: number): Board => {
  switch (size) {
    case 8:
      return BOARD_8;
    default:
      return TEST;
  }
};

export const isFriendlyOccupied = (
  colour: string,
  pos: Position,
  board: Board
): boolean => {
  const occupant = board.squares[pos.y][pos.x].piece;
  if (occupant) {
    if (occupant.colour === colour) {
      return true;
    }
  }
  return false;
};

export const isEnemyOccupied = (
  colour: string,
  pos: Position,
  board: Board
): boolean => {
  const occupant = board.squares[pos.y][pos.x].piece;
  if (occupant) {
    if (occupant.colour !== colour) {
      return true;
    }
  }
  return false;
};

export const isCheck = (
  colour: string,
  pos: Position,
  board: Board
): boolean => {
  for (let j = 0; j < board.size; j++) {
    for (let i = 0; i < board.size; i++) {
      const square = board.squares[j][i];
      const piecePos = { x: i, y: j };
      if (square.piece) {
        if (
          square.piece.pieceType.toLowerCase() === PieceType.KING ||
          square.piece.pieceType ||
          square.piece.colour === colour
        ) {
          continue;
        }

        const validMoves: Position[] = move(piecePos, square.piece, board);
        if (validMoves.includes(pos)) {
          return true;
        }
      }
    }
  }
  return false;
};

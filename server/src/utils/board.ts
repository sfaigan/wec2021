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

const putInCheckBy = (
  colour: string,
  pos: Position,
  board: Board
): [Piece, Position] => {
  for (let j = 0; j < board.size; j++) {
    for (let i = 0; i < board.size; i++) {
      const square = board.squares[j][i];
      const piecePos = { x: i, y: j };
      if (square.piece) {
        if (
          square.piece.pieceType.toLowerCase() === PieceType.KING ||
          square.piece.colour === colour
        ) {
          continue;
        }

        const validMoves: Position[] = move(piecePos, square.piece, board);
        if (validMoves.includes(pos)) {
          return [square.piece, piecePos];
        }
      }
    }
  }
};

const getKingPos = (colour: string, board: Board): Position => {
  for (let j = 0; j < board.size; j++) {
    for (let i = 0; i < board.size; i++) {
      const square = board.squares[j][i];
      if (square.piece) {
        if (
          square.piece.pieceType.toLowerCase() === PieceType.KING &&
          square.piece.colour === colour
        ) {
          return { x: i, y: j };
        }
      }
    }
  }
};

export const checkFilter = (
  currMoves: Position[],
  board: Board,
  colour: string
): Position[] => {
  const kingPos = getKingPos(colour, board);
  if (!isCheck(colour, kingPos, board)) {
    return currMoves;
  }
  const [checkPiece, checkPiecePos] = putInCheckBy(colour, kingPos, board);
  const checkPieceMoves = move(checkPiecePos, checkPiece, board);
  const newMoves: Position[] = [];
  if (currMoves.includes(checkPiecePos)) {
    newMoves.push(checkPiecePos);
  }
  // knight can't be blocked
  if (checkPiece.pieceType === PieceType.KNIGHT) {
    return newMoves;
  }
  for (const move of checkPieceMoves) {
    if (currMoves.includes(move)) {
      newMoves.push(move);
    }
  }
  return newMoves;
};

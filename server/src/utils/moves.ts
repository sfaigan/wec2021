/* eslint-disable import/namespace */
import { Board, Piece } from "../models/board";
import { Colour, PieceType } from "../constants";
import { Position } from "../types";
import {
  checkFilter,
  isCheck,
  isEnemyOccupied,
  isFriendlyOccupied,
} from "./board";

export const move = (pos: Position, piece: Piece, board: Board): Position[] => {
  let legalMoves: Position[] = [];
  switch (piece.pieceType.toLowerCase()) {
    case PieceType.PAWN: {
      legalMoves = movePawn(piece, pos, board);
      break;
    }
    case PieceType.KNIGHT: {
      legalMoves = moveKnight(piece, pos, board);
      break;
    }
    case PieceType.BISHOP: {
      legalMoves = moveBishop(piece, pos, board);
      break;
    }
    case PieceType.ROOK: {
      legalMoves = moveRook(piece, pos, board);
      break;
    }
    case PieceType.VANGUARD: {
      legalMoves = moveVanguard(piece, pos, board);
      break;
    }
    case PieceType.QUEEN: {
      legalMoves = moveQueen(piece, pos, board);
      break;
    }
    case PieceType.KING: {
      legalMoves = moveKing(piece, pos, board);
      break;
    }
  }

  legalMoves = checkFilter(legalMoves, board, piece.colour);

  return legalMoves;
};

// USE LIKE board[y][x] or board[j][i]

const movePawn = (piece: Piece, pos: Position, board: Board): Position[] => {
  const legalMoves = [] as Position[];
  if (piece.colour === Colour.BLACK) {
    for (let j = pos.y + 1; j < board.size && j <= pos.y + 3; j++) {
      const newPos = { x: pos.x, y: j };
      const newPosLeft = { x: pos.x - 1, y: j };
      const newPosRight = { x: pos.x + 1, y: j };
      if (
        isEnemyOccupied(piece.colour, newPos, board) &&
        !isEnemyOccupied(piece.colour, newPosLeft, board) &&
        !isEnemyOccupied(piece.colour, newPosRight, board) &&
        !isFriendlyOccupied(piece.colour, newPos, board)
      ) {
        legalMoves.push(newPosLeft);
        legalMoves.push(newPosRight);
      }
      if (
        isEnemyOccupied(piece.colour, newPos, board) &&
        isEnemyOccupied(piece.colour, newPosLeft, board) &&
        !isEnemyOccupied(piece.colour, newPosRight, board) &&
        !isFriendlyOccupied(piece.colour, newPos, board)
      ) {
        legalMoves.push(newPosRight);
      }
      if (
        isEnemyOccupied(piece.colour, newPos, board) &&
        !isEnemyOccupied(piece.colour, newPosLeft, board) &&
        isEnemyOccupied(piece.colour, newPosRight, board) &&
        !isFriendlyOccupied(piece.colour, newPos, board)
      ) {
        legalMoves.push(newPosLeft);
      }
      if (
        !isEnemyOccupied(piece.colour, newPos, board) &&
        !isFriendlyOccupied(piece.colour, newPos, board)
      ) {
        legalMoves.push(newPos);
      }
    }
  }

  if (piece.colour === Colour.WHITE) {
    for (let j = pos.y - 1; j > 0 && j >= pos.y - 3; j--) {
      const newPos = { x: pos.x, y: j };
      const newPosLeft = { x: pos.x - 1, y: j };
      const newPosRight = { x: pos.x + 1, y: j };
      if (
        isEnemyOccupied(piece.colour, newPos, board) &&
        !isEnemyOccupied(piece.colour, newPosLeft, board) &&
        !isEnemyOccupied(piece.colour, newPosRight, board) &&
        !isFriendlyOccupied(piece.colour, newPos, board)
      ) {
        legalMoves.push(newPosLeft);
        legalMoves.push(newPosRight);
      }
      if (
        isEnemyOccupied(piece.colour, newPos, board) &&
        isEnemyOccupied(piece.colour, newPosLeft, board) &&
        !isEnemyOccupied(piece.colour, newPosRight, board) &&
        !isFriendlyOccupied(piece.colour, newPos, board)
      ) {
        legalMoves.push(newPosRight);
      }
      if (
        isEnemyOccupied(piece.colour, newPos, board) &&
        !isEnemyOccupied(piece.colour, newPosLeft, board) &&
        isEnemyOccupied(piece.colour, newPosRight, board) &&
        !isFriendlyOccupied(piece.colour, newPos, board)
      ) {
        legalMoves.push(newPosLeft);
      }
      if (
        !isEnemyOccupied(piece.colour, newPos, board) &&
        !isFriendlyOccupied(piece.colour, newPos, board)
      ) {
        legalMoves.push(newPos);
      }
    }
  }

  return legalMoves;
};

const moveKnight = (piece: Piece, pos: Position, board: Board): Position[] => {
  const legalMoves = [] as Position[];

  // fetch all possible bishop & rook moves from the given position
  const diagonalMoves = [] as Position[];
  for (
    let i = pos.x + 1, j = pos.y + 1;
    i < board.size && j < board.size;
    i++, j++
  ) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: j };
    diagonalMoves.push(newPos);
  }
  // check bottom left diagonal (going south west)
  for (let i = pos.x - 1, j = pos.y + 1; i >= 0 && j < board.size; i--, j++) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: j };

    diagonalMoves.push(newPos);
  }
  // check front right diagonal (going north east)
  for (let i = pos.x + 1, j = pos.y - 1; i < board.size && j >= 0; i++, j--) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: j };
    diagonalMoves.push(newPos);
  }
  // check front left diagonal (going north west)
  for (let i = pos.x - 1, j = pos.y - 1; i >= 0 && j >= 0; i--, j--) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: j };
    diagonalMoves.push(newPos);
  }
  const rookMoves = [] as Position[];
  for (let j = pos.y - 1; j >= 0; j--) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: pos.x, y: j };
    rookMoves.push(newPos);
  }
  // check going south
  for (let j = pos.y + 1; j < board.size; j++) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: pos.x, y: j };
    rookMoves.push(newPos);
  }
  // check east
  for (let i = pos.x + 1; i < board.size; i++) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: pos.y };
    rookMoves.push(newPos);
  }
  // check west
  for (let i = pos.x - 1; i >= 0; i--) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: pos.y };
    rookMoves.push(newPos);
  }
  const allMoves = diagonalMoves.concat(rookMoves);

  // add all moves from above that are in range
  for (const move of allMoves) {
    if (
      Math.abs(pos.x - move.x) >= 2 &&
      Math.abs(pos.x - move.x) <= 4 &&
      Math.abs(pos.y - move.y) <= 4 &&
      Math.abs(pos.y - move.y) >= 2
    ) {
      legalMoves.push(move);
    }
  }

  return legalMoves;
};

const moveBishop = (piece: Piece, pos: Position, board: Board): Position[] => {
  const legalMoves = [] as Position[];
  // check bottom right diagonal (going south east)
  for (
    let i = pos.x + 1, j = pos.y + 1;
    i < board.size && j < board.size;
    i++, j++
  ) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: j };
    if (!isFriendlyOccupied(piece.colour, newPos, board)) {
      legalMoves.push(newPos);
    } else {
      break;
    }
  }
  // check bottom left diagonal (going south west)
  for (let i = pos.x - 1, j = pos.y + 1; i >= 0 && j < board.size; i--, j++) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: j };
    if (!isFriendlyOccupied(piece.colour, newPos, board)) {
      legalMoves.push(newPos);
    } else {
      break;
    }
  }
  // check front right diagonal (going north east)
  for (let i = pos.x + 1, j = pos.y - 1; i < board.size && j >= 0; i++, j--) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: j };
    if (!isFriendlyOccupied(piece.colour, newPos, board)) {
      legalMoves.push(newPos);
    } else {
      break;
    }
  }
  // check front left diagonal (going north west)
  for (let i = pos.x - 1, j = pos.y - 1; i >= 0 && j >= 0; i--, j--) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: j };
    if (!isFriendlyOccupied(piece.colour, newPos, board)) {
      legalMoves.push(newPos);
    } else {
      break;
    }
  }

  return legalMoves;
};

const moveRook = (piece: Piece, pos: Position, board: Board): Position[] => {
  const legalMoves = [] as Position[];
  // check going north
  for (let j = pos.y - 1; j >= 0; j--) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: pos.x, y: j };
    if (!isFriendlyOccupied(piece.colour, newPos, board)) {
      legalMoves.push(newPos);
    } else {
      break;
    }
  }
  // check going south
  for (let j = pos.y + 1; j < board.size; j++) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: pos.x, y: j };
    if (!isFriendlyOccupied(piece.colour, newPos, board)) {
      legalMoves.push(newPos);
    } else {
      break;
    }
  }
  // check east
  for (let i = pos.x + 1; i < board.size; i++) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: pos.y };
    if (!isFriendlyOccupied(piece.colour, newPos, board)) {
      legalMoves.push(newPos);
    } else {
      break;
    }
  }
  // check west
  for (let i = pos.x - 1; i >= 0; i--) {
    /**util function to check if square is occupied by own colour piece */
    const newPos = { x: i, y: pos.y };
    if (!isFriendlyOccupied(piece.colour, newPos, board)) {
      legalMoves.push(newPos);
    } else {
      break;
    }
  }

  return legalMoves;
};

// Vanguard has initial stretch and final stretch
// where final stretch is the squares available to move to after it takes a turn
const moveVanguard = (
  piece: Piece,
  pos: Position,
  board: Board
): Position[] => {
  const legalMoves = [] as Position[];
  // check going north
  for (let j = pos.y - 1; j >= 0; j--) {
    /**util function to check if square is occupied by own colour piece */
    //also check if enemy piece, can't take on initial stretch
    const newPos = { x: pos.x, y: j };
    if (
      !isFriendlyOccupied(piece.colour, newPos, board) &&
      !isEnemyOccupied(piece.colour, newPos, board)
    ) {
      //check east
      for (let i = pos.x + 1; i < board.size; i++) {
        const newPos = { x: i, y: j };
        /**util function to check if square is occupied by own colour piece */
        if (!isFriendlyOccupied(piece.colour, newPos, board)) {
          legalMoves.push(newPos);
        } else {
          break;
        }
      }
      // check west
      for (let i = pos.x - 1; i >= 0; i--) {
        /**util function to check if square is occupied by own colour piece */
        const newPos = { x: i, y: j };
        if (!isFriendlyOccupied(piece.colour, newPos, board)) {
          legalMoves.push(newPos);
        } else {
          break;
        }
      }
    } else {
      break;
    }
  }
  // check going south
  for (let j = pos.y + 1; j < board.size; j++) {
    const newPos = { x: pos.x, y: j };
    /**util function to check if square is occupied by own colour piece */
    //also check if enemy piece, can't take on initial stretch
    if (
      !isFriendlyOccupied(piece.colour, newPos, board) &&
      !isEnemyOccupied(piece.colour, newPos, board)
    ) {
      // check east
      for (let i = pos.x + 1; i < board.size; i++) {
        const newPos = { x: i, y: j };
        /**util function to check if square is occupied by own colour piece */
        if (!isFriendlyOccupied(piece.colour, newPos, board)) {
          legalMoves.push(newPos);
        } else {
          break;
        }
      }
      // check west
      for (let i = pos.x - 1; i >= 0; i--) {
        const newPos = { x: i, y: j };
        /**util function to check if square is occupied by own colour piece */
        if (!isFriendlyOccupied(piece.colour, newPos, board)) {
          legalMoves.push(newPos);
        } else {
          break;
        }
      }
    } else {
      break;
    }
    return legalMoves;
  }
  // check east
  for (let i = pos.x + 1; i < board.size; i++) {
    const newPos = { x: i, y: pos.y };
    /**util function to check if square is occupied by own colour piece */
    //also check if enemy piece, can't take on initial stretch
    if (
      !isFriendlyOccupied(piece.colour, newPos, board) &&
      !isEnemyOccupied(piece.colour, newPos, board)
    ) {
      // check going south
      for (let j = pos.y + 1; j < board.size; j++) {
        const newPos = { x: i, y: j };
        /**util function to check if square is occupied by own colour piece */
        if (!isFriendlyOccupied(piece.colour, newPos, board)) {
          legalMoves.push(newPos);
        } else {
          break;
        }
      }
      // check going north
      for (let j = pos.y - 1; j >= 0; j--) {
        const newPos = { x: i, y: j };
        /**util function to check if square is occupied by own colour piece */
        if (!isFriendlyOccupied(piece.colour, newPos, board)) {
          legalMoves.push(newPos);
        } else {
          break;
        }
      }
    } else {
      break;
    }
  }
  // check west
  for (let i = pos.x - 1; i >= 0; i--) {
    const newPos = { x: i, y: pos.y };
    /**util function to check if square is occupied by own colour piece */
    //also check if enemy piece, can't take on initial stretch
    if (
      !isFriendlyOccupied(piece.colour, newPos, board) &&
      !isEnemyOccupied(piece.colour, newPos, board)
    ) {
      // check going south
      for (let j = pos.y + 1; j < board.size; j++) {
        const newPos = { x: i, y: j };
        /**util function to check if square is occupied by own colour piece */
        if (!isFriendlyOccupied(piece.colour, newPos, board)) {
          legalMoves.push(newPos);
        } else {
          break;
        }
      }
      // check going north
      for (let j = pos.y - 1; j >= 0; j--) {
        const newPos = { x: i, y: j };
        /**util function to check if square is occupied by own colour piece */
        if (!isFriendlyOccupied(piece.colour, newPos, board)) {
          legalMoves.push(newPos);
        } else {
          break;
        }
      }
    } else {
      break;
    }
  }
  return legalMoves;
};

const moveQueen = (piece: Piece, pos: Position, board: Board): Position[] => {
  // fetch all possible bishop & rook moves from the given position
  let legalMoves = moveBishop(piece, pos, board);
  legalMoves = legalMoves.concat(moveRook(piece, pos, board));

  return legalMoves;
};

const moveKing = (piece: Piece, pos: Position, board: Board): Position[] => {
  const legalMoves = [] as Position[];
  let newPos = { x: pos.x + 1, y: pos.y } as Position;
  if (
    newPos.x < board.size &&
    !isFriendlyOccupied(piece.colour, pos, board) &&
    !isCheck(piece.colour, newPos, board)
  ) {
    legalMoves.push(newPos);
  }
  newPos = { x: pos.x + 1, y: pos.y + 1 };
  if (
    newPos.x < board.size &&
    newPos.y < board.size &&
    !isFriendlyOccupied(piece.colour, newPos, board) &&
    !isCheck(piece.colour, newPos, board)
  ) {
    legalMoves.push(newPos);
  }
  newPos = { x: pos.x + 1, y: pos.y - 1 };
  if (
    newPos.x < board.size &&
    newPos.y >= 0 &&
    !isFriendlyOccupied(piece.colour, newPos, board) &&
    !isCheck(piece.colour, newPos, board)
  ) {
    legalMoves.push(newPos);
  }
  newPos = { x: pos.x - 1, y: pos.y };
  if (
    newPos.x >= 0 &&
    !isFriendlyOccupied(piece.colour, newPos, board) &&
    !isCheck(piece.colour, newPos, board)
  ) {
    legalMoves.push(newPos);
  }
  newPos = { x: pos.x - 1, y: pos.y + 1 };
  if (
    newPos.x >= 0 &&
    newPos.y < board.size &&
    !isFriendlyOccupied(piece.colour, newPos, board) &&
    !isCheck(piece.colour, newPos, board)
  ) {
    legalMoves.push(newPos);
  }
  newPos = { x: pos.x - 1, y: pos.y - 1 };
  if (
    newPos.x >= 0 &&
    newPos.y >= 0 &&
    !isFriendlyOccupied(piece.colour, newPos, board) &&
    !isCheck(piece.colour, newPos, board)
  ) {
    legalMoves.push(newPos);
  }
  newPos = { x: pos.x, y: pos.y + 1 };
  if (
    newPos.y < board.size &&
    !isFriendlyOccupied(piece.colour, newPos, board) &&
    !isCheck(piece.colour, newPos, board)
  ) {
    legalMoves.push(newPos);
  }
  newPos = { x: pos.x, y: pos.y - 1 };
  if (
    newPos.y >= 0 &&
    !isFriendlyOccupied(piece.colour, newPos, board) &&
    !isCheck(piece.colour, newPos, board)
  ) {
    legalMoves.push(newPos);
  }

  return legalMoves;
};

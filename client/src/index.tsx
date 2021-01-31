import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/app";
import reportWebVitals from "./reportWebVitals";
import { Board } from "./components/board";
import { Board as BoardType, Colour, PieceType } from "./types";

const BOARD_8 = {
  size: 8,
  squares: [
    [
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.ROOK,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.KNIGHT,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.BISHOP,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.QUEEN,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.KING,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.BISHOP,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.KNIGHT,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.ROOK,
          colour: Colour.BLACK,
        },
      },
    ],
    [
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.BLACK,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.BLACK,
        },
      },
    ],
    [
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
    ],
    [
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
    ],
    [
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
    ],
    [
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
    ],
    [
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.PAWN,
          colour: Colour.WHITE,
        },
      },
    ],
    [
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.ROOK,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.KNIGHT,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.BISHOP,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.QUEEN,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.KING,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.BISHOP,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.BLACK,
        piece: {
          pieceType: PieceType.KNIGHT,
          colour: Colour.WHITE,
        },
      },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.ROOK,
          colour: Colour.WHITE,
        },
      },
    ],
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

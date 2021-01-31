import "../index.css";
import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import {
  Board as BoardType,
  Colour,
  Square as SquareType,
  Position,
} from "../types";

interface Props {
  shade: string;
  board: BoardType;
  i: number;
  j: number;
}

let move = false;

const Square: React.FC<Props> = (props) => {
  const arr: Position[] = [];
  const [oldSquare, setOldSquare] = useState(
    props.board.squares[props.i][props.j]
  );
  const [square, setSquare] = useState(props.board.squares[props.i][props.j]);

  const onClick = () => {
    console.log(props.i + " " + props.j);
    if (!move) {
      // setSquare(props.board.squares[props.i][props.j]);

      move = true;
    } else {
      console.log("picked a spot for the piece");
      move = false;
    }
    // console.log(props.i + " " + props.j);
  };

  return (
    <button className={"square " + props.shade} onClick={onClick}>
      {props.i > 5 || props.i < 2
        ? props.board.squares[props.i][props.j].piece.pieceType
        : null}
    </button>
  );
};

const renderSquare = (
  squareShade: string,
  board: BoardType,
  i: number,
  j: number
) => {
  return <Square shade={squareShade} board={board} i={i} j={j} />;
};

export const Board: React.FC<{ board: BoardType }> = ({ board }) => {
  console.log(board.squares[1][7].piece.pieceType);
  const renderBoard: JSX.Element[] = [];
  for (let i = 0; i < 8; i++) {
    const squareRows: JSX.Element[] = [];
    for (let j = 0; j < 8; j++) {
      const squareShade =
        board.squares[j][i].colour === Colour.WHITE
          ? "light-square"
          : "dark-square";
      squareRows.push(renderSquare(/* i * 8 + j, */ squareShade, board, i, j));
    }
    renderBoard.push(<div className="board-row">{squareRows}</div>);
  }

  return <div>{renderBoard}</div>;
};

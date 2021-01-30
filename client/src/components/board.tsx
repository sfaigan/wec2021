import "../index.css";
import React from "react";
import Chessboard from "chessboardjsx";
import { Board as BoardType, Colour } from "../types";

interface Props {
  shade: string;
}

const Square: React.FC<Props> = (props) => {
  return <button className={"square " + props.shade}>d</button>;
};

const renderSquare = (i: number, squareShade: string) => {
  return <Square shade={squareShade} />;
};

interface BoardProps {
  board: BoardType;
}

export const Board: React.FC<BoardProps> = (props) => {
  const board: JSX.Element[] = [];
  for (let i = 0; i < 8; i++) {
    const squareRows: JSX.Element[] = [];
    for (let j = 0; j < 8; j++) {
      const squareShade =
        props.board.squares[j][i].colour === Colour.WHITE
          ? "light-square"
          : "dark-square";
      squareRows.push(renderSquare(i * 8 + j, squareShade));
    }
    board.push(<div className="board-row">{squareRows}</div>);
  }

  return <div>{board}</div>;
};

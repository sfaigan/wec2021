import "../index.css";
import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import {
  Board as BoardType,
  Colour,
  Square as SquareType,
  Position,
} from "../types";
import { gameUpdate } from "./sockets/emit";
import { useGame } from "../hooks/useGame";

export interface Piece {
  pieceType: string;
  colour: string;
}

export interface Square {
  piece?: Piece;
  colour: string;
}

interface Props {
  shade: string;
  board: BoardType;
  i: number;
  j: number;
  onClick?: (i: number, y: number) => void;
}

const Square: React.FC<Props> = (props) => {
  const onClick = () => {
    if (props.onClick) {
      props.onClick(props.i, props.j);
    }
  };

  return (
    <button className={"square " + props.shade} onClick={() => onClick()}>
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
  j: number,
  onClick?: (i: number, y: number) => void
) => {
  return (
    <Square shade={squareShade} board={board} i={i} j={j} onClick={onClick} />
  );
};

export interface MoveRequest {
  currentPos: { x: number; y: number };
  newPos: { x: number; y: number };
  piece: Piece;
}

export const Board: React.FC<{ board: BoardType }> = ({ board }) => {
  const { roomId } = useGame();
  const [select, setSelect] = useState(false);
  const [lastPos, setLastPos] = useState<
    { i: number; j: number } | undefined
  >();

  const handleClick = (i: number, j: number) => {
    if (!select) {
      console.log("first");
      setLastPos({ i, j });
      setSelect(true);
    } else {
      console.log("second");
      console.log(i, j, select, lastPos);
      setSelect(false);

      if (lastPos && roomId) {
        gameUpdate(
          {
            currentPos: { x: i, y: j },
            newPos: { x: lastPos?.i, y: lastPos.j },
            piece: board.squares[j][i].piece,
          },
          roomId
        );
      }
    }
  };

  const renderBoard: JSX.Element[] = [];
  for (let i = 0; i < 8; i++) {
    const squareRows: JSX.Element[] = [];
    for (let j = 0; j < 8; j++) {
      const squareShade =
        board.squares[j][i].colour === Colour.WHITE
          ? "light-square"
          : "dark-square";
      squareRows.push(
        renderSquare(/* i * 8 + j, */ squareShade, board, i, j, handleClick)
      );
    }
    renderBoard.push(<div className="board-row">{squareRows}</div>);
  }

  return <div>{renderBoard}</div>;
};

// TODO: Find a better way to share interfaces without introducing an entire shared package
export interface Example {
  _id: string;
  foo: string;
  bar: string;
}

export type ExampleAdd = Pick<Example, "foo" | "bar">;
export type ExampleUpdate = Partial<Pick<Example, "foo" | "bar">>;

export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  pieceType: string;
  position: Position;
  colour: string;
}

export interface Square {
  piece: Piece;
  colour: string;
}
export interface Board {
  size: number;
  squares: Square[][];
}

export enum PieceType {
  PAWN = "pawn",
  BISHOP = "bishop",
  ROOK = "rook",
  KNIGHT = "knight",
  QUEEN = "queen",
  KING = "king",
  VANGUARD = "vanguard",
}

export enum Colour {
  WHITE = "white",
  BLACK = "black",
}

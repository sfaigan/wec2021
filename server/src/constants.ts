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

export const TEST = {
  size: 8,
  squares: [
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
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      {
        colour: Colour.WHITE,
        piece: {
          pieceType: PieceType.KNIGHT,
          colour: Colour.WHITE,
        },
      },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
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
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
      { colour: Colour.WHITE },
      { colour: Colour.BLACK },
    ],
  ],
};

export const BOARD_8 = {
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

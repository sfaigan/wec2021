import { Board } from "../models/board";
import { BOARD_8 } from "../constants";

export const generateBoard = (size: number): Board => {
  switch (size) {
    case 8:
      return BOARD_8;
    default:
      return BOARD_8;
  }
};

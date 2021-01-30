import { Request, Response } from "express";
import { Colour } from "../constants";
import { Game, GameDoc } from "../models/game";
import { generateBoard } from "../utils/board";

const getById = async (req: Request, res: Response): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP GET /games/${id}`);

  try {
    const game = await Game.findById(id);
    res.send(game);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const get = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP GET /games`);

  try {
    const games = await Game.find();
    res.send(games);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  console.log(`HTTP POST /games`);

  const size = req?.body?.size ?? 8;
  const board = generateBoard(size);
  const turn = Colour.WHITE;

  const game = new Game({ board, turn });

  try {
    const result = await game.save();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP DELETE /games/${id}`);

  try {
    await Game.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const GamesController = {
  getById,
  get,
  create,
  // update,
  remove,
};

import { Request, Response } from "express";
import { Server } from "socket.io";
import { Colour } from "../constants";
import { Game, GameDoc } from "../models/game";
import { generateBoard } from "../utils/board";

const getById = async (
  req: Request,
  res: Response,
  io: Server
): Promise<void> => {
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

const get = async (req: Request, res: Response, io: Server): Promise<void> => {
  console.log(`HTTP GET /games`);

  try {
    const games = await Game.find();
    res.send(games);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const joinById = async (
  req: Request,
  res: Response,
  io: Server
): Promise<void> => {
  const sid = (req.body.socketId as string) || undefined;
  const id = req?.params?.id;

  const socket = sid ? io.sockets.sockets.get(sid) : undefined;

  if (!socket || !id) {
    res.sendStatus(500);
    return;
  }

  try {
    const game = await Game.findById(id);
    socket.join(id);
    io.to(id).emit("game/success", { code: id, game: game });
    res.status(200).send(game);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const create = async (
  req: Request,
  res: Response,
  io: Server
): Promise<void> => {
  console.log(`HTTP POST /games`);

  const size = req?.body?.size ?? 8;
  const board = generateBoard(size);
  const turn = Colour.WHITE;

  const game = new Game({ board, turn });
  const sid = (req.body.socketId as string) || undefined;

  console.log(sid);

  const socket = sid ? io.sockets.sockets.get(sid) : undefined;
  if (!socket) {
    res.sendStatus(500);
    return;
  }

  try {
    const result = await game.save();
    const roomId = result._id;

    // join the game
    socket.join(roomId);

    // emit a notification that the game (lobby) was created successfully with the game code.
    console.log(roomId, result);
    socket.to(roomId).emit("game/success", { code: roomId, game: result });
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const remove = async (
  req: Request,
  res: Response,
  io: Server
): Promise<void> => {
  const id = req?.params?.id;
  console.log(`HTTP DELETE /games/${id}`);
  const sid = (req.body.socketId as string) || undefined;

  try {
    await Game.findByIdAndDelete(id);

    // removes current user from game room
    const socket = sid ? io.sockets.sockets.get(sid) : undefined;
    if (socket) {
      socket.leave(id);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const GamesController = {
  getById,
  get,
  joinById,
  create,
  remove,
};

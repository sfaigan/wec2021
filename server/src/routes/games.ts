import { Router } from "express";
import { Server } from "socket.io";
import { GamesController } from "../controllers/games";

export const getGamesRouter = (io: Server) => {
  const router = Router();

  router.post("/", (req, res) => GamesController.create(req, res, io));
  router.get("/", (req, res) => GamesController.get(req, res, io));
  router.get("/:id", (req, res) => GamesController.getById(req, res, io));
  router.post("/join/:id", (req, res) =>
    GamesController.joinById(req, res, io)
  );
  // router.put("/:id", (req, res) => GamesController.update(req, res));
  router.delete("/:id", (req, res) => GamesController.remove(req, res, io));

  return router;
};

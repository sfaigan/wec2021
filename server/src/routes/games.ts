import { Router } from "express";
import { GamesController } from "../controllers/games";

const router = Router();

router.post("/", (req, res) => GamesController.create(req, res));
router.get("/", (req, res) => GamesController.get(req, res));
router.get("/:id", (req, res) => GamesController.getById(req, res));
// router.put("/:id", (req, res) => GamesController.update(req, res));
router.delete("/:id", (req, res) => GamesController.remove(req, res));

export default router;

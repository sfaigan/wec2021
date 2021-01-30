import { Router } from "express";
import { ExamplesController } from "../controllers/examples";

const router = Router();

router.post("/", (req, res) => ExamplesController.create(req, res));
router.get("/", (req, res) => ExamplesController.get(req, res));
router.get("/:id", (req, res) => ExamplesController.getById(req, res));
router.put("/:id", (req, res) => ExamplesController.update(req, res));
router.delete("/:id", (req, res) => ExamplesController.remove(req, res));

export default router;

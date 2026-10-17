import { Router } from "express";
import todoController from "../controllers/controller.js";

const router = Router();

router.get("/", todoController.getAll);
router.post("/", todoController.create);
router.get("/:id", todoController.getOne);
router.patch("/:id", todoController.update);
router.delete("/:id", todoController.remove);

export default router;

import { Router } from "express";
import { checkAuth } from "../middleware/check-auth.middleware";

const router = Router();
router.use(checkAuth);

import {
  createTodo,
  getAll,
  getOne,
  updateTodo,
  deleteTodo,
} from "../controller/TodoController";

router.post("/todos", createTodo);
router.get("/todos", getAll);
router.get("/todos/:id", getOne);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;

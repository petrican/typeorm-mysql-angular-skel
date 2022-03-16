import { Router } from "express";
const router = Router();

import { login, logout } from "../controller/LoginController";

router.post("/login", login);
router.get("/logout", logout);

export default router;

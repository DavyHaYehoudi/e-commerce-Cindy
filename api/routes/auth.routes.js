import express from "express";
import { register } from "../controllers/authentication/register.controller.js";
import { login } from "../controllers/authentication/login.controller.js";
import { requestPasswordReset } from "../controllers/authentication/requestPasswordReset.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/request-password-reset", requestPasswordReset);

export default router;

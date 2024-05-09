import express from "express";
import { register } from "../controllers/authentication/register.controller.js";
import { login } from "../controllers/authentication/login.controller.js";
import { requestPasswordReset } from "../controllers/authentication/requestPasswordReset.controller.js";
import { verifyEmail } from "../controllers/authentication/verifyEmail.controller.js";
import { resetPassword } from "../controllers/authentication/resetPassword.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import verifyToken from "../controllers/authentication/verifyToken.controller.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
import authenticateUser from "../controllers/authentication/authenticateUser.js";
const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.get(
  "/verify-token/client",
  authenticateJWT,
  authenticateUser,
  verifyToken
);
router.get(
  "/verify-token/admin",
  authenticateJWT,
  authenticateAdmin,
  verifyToken
);

export default router;

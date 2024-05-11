import express from "express";
import promocodeController from "../controllers/promocode.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
const router = express.Router();

//Privé ADMIN
router.use(authenticateJWT);
router.get("/", authenticateAdmin, promocodeController.getAllPromocode);
router.post("/", authenticateAdmin, promocodeController.createPromocode);
router.delete(
  "/:promocodeId",
  authenticateAdmin,
  promocodeController.deletePromocode
);

export default router;

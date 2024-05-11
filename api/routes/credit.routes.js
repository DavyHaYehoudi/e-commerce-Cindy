import express from "express";
const router = express.Router();
import creditController from "../controllers/credit.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
import authenticateUser from "../controllers/authentication/authenticateUser.js";

//Privé
router.use(authenticateJWT);
//Privé ADMIN
router.get("/", authenticateAdmin, creditController.getAllCredits);
//Privé USER
router.patch(
  "/:orderProductsId",
  authenticateUser,
  creditController.archiveCredit
);

export default router;

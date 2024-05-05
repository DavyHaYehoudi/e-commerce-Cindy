import express from "express";
import giftcardController from "../controllers/giftcard.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
import authenticateUser from "../controllers/authentication/authenticateUser.js";

const router = express.Router();

//Privé
router.use(authenticateJWT);
//Privé ADMIN
router.get("/", authenticateAdmin, giftcardController.getAllGiftcards);
//Privé USER
router.post("/", authenticateUser, giftcardController.createGiftcard);
router.patch("/", authenticateUser, giftcardController.consumerGiftcard);

export default router;

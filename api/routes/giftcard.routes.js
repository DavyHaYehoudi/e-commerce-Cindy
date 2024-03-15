import express from "express";
import giftcardController from "../controllers/giftcard.controller.js";

const router = express.Router();

router.get("/", giftcardController.getAllGiftcards);
router.post("/", giftcardController.createGiftcard);
router.patch("/", giftcardController.consumerGiftcard);

export default router;

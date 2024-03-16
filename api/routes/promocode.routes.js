import express from "express";
import promocodeController from "../controllers/promocode.controller.js";
const router = express.Router();

router.get("/", promocodeController.getAllPromocode);
router.post("/", promocodeController.createPromocode);
router.delete("/:promocodeId", promocodeController.deletePromocode);

export default router;
 
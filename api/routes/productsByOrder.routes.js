import express from "express";
const router = express.Router();
import productsByOrderController from "../controllers/productsByOrder.controller.js";

router.get("/", productsByOrderController.getAllProducts);
router.patch("/note/:productsbyorderId", productsByOrderController.addNote);

export default router;

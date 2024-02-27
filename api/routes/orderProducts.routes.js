import express from "express";
const router = express.Router();
import orderProductsController from "../controllers/orderProducts.controller.js";

router.get("/", orderProductsController.getAllProducts);
router.patch("/:orderProductsId/note", orderProductsController.addNote);

export default router;

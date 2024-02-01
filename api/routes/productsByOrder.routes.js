import express from 'express'
const router = express.Router();
import productsByOrderController from '../controllers/productsByOrder.controller.js';

router.get("/", productsByOrderController.getAllProducts);
router.patch("/:productsByOrderId", productsByOrderController.updateProducts);

export default router;


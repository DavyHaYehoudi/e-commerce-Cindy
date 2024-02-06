import express from 'express'
const router = express.Router();
import orderController from '../controllers/order.controller.js';

router.get("/", orderController.getAllOrders);
router.patch("/:orderId", orderController.updateOrder);

export default router;
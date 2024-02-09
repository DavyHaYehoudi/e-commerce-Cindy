import express from 'express'
const router = express.Router();
import orderController from '../controllers/order.controller.js';
import sendToClientController from '../controllers/sendToClient.controller.js';

router.get("/", orderController.getAllOrders);
router.patch("/:orderId", sendToClientController.updateOrder);

export default router;
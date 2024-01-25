import express from 'express'
const router = express.Router();
import orderController from '../controllers/order.controller.js';

router.get("/", orderController.getAllOrders);

export default router;
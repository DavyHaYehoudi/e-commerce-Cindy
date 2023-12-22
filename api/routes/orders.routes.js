import express from 'express'
const router = express.Router();
import ordersController from '../controllers/orders.controller.js';

router.get("/", ordersController.getAllOrders);

export default router;
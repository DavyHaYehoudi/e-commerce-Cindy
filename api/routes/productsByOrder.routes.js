import express from 'express'
const router = express.Router();
import productsByOrderController from '../controllers/productsByOrder.controller.js';

router.get("/", productsByOrderController.getAllProducts);

export default router;


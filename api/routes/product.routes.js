import express from 'express'
const router = express.Router();
import productController from '../controllers/product.controller.js';

router.get("/", productController.getAllProduct);

export default router;


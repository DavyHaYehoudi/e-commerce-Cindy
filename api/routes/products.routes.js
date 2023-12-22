import express from 'express'
const router = express.Router();
import productsController from '../controllers/products.controller.js';

router.get("/", productsController.getAllProducts);

export default router;


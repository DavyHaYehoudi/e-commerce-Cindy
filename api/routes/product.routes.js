import express from 'express'
const router = express.Router();
import productController from '../controllers/product.controller.js';

router.get("/", productController.getAllProduct);
router.get("/:productId", productController.getProductById);
router.post("/",productController.createProduct)
router.patch("/:productId",productController.updateProduct)
router.delete("/:productId", productController.deleteProduct);


export default router;


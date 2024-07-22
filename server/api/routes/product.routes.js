import express from "express";
const router = express.Router();
import productController from "../controllers/productsController/product.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";


//Public
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);

//Privé ADMIN
router.use(authenticateJWT);
router.post("/",authenticateAdmin, productController.createProduct);
router.patch("/:productId",authenticateAdmin, productController.updateProduct);
router.delete("/:productId",authenticateAdmin, productController.deleteProduct);

export default router;

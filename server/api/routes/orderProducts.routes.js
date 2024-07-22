import express from "express";
const router = express.Router();
import orderProductsController from "../controllers/orderProducts.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";

//Privé ADMIN
router.use(authenticateJWT);
router.get("/", authenticateAdmin, orderProductsController.getAllProducts);
router.patch(
  "/:orderProductsId/note",
  authenticateAdmin,
  orderProductsController.addNote
);

export default router;

import express from "express";
import categoryController from "../controllers/category.controler.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
const router = express.Router();

//Public
router.get("/", categoryController.getCategories);
//Privé ADMIN
router.use(authenticateJWT);
router.post("/", authenticateAdmin, categoryController.createCategory);
router.patch(
  "/:categoryId",
  authenticateAdmin,
  categoryController.updateCategory
);
router.delete(
  "/:categoryId",
  authenticateAdmin,
  categoryController.deleteCategory
);

export default router;

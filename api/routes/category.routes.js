import express from "express";
import categoryController from "../controllers/category.controler.js";
const router = express.Router();

router.get("/", categoryController.getCategories);
router.post("/", categoryController.createCategory);
router.patch("/:categoryId", categoryController.updateCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

export default router;

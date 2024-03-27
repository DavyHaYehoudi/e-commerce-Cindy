import express from "express";
import materialController from "../controllers/material.controller.js";
const router = express.Router();

router.get("/", materialController.getAllMaterials);
router.post("/", materialController.createMaterials);
router.patch("/:materialId", materialController.updateMaterials);
router.delete("/:materialId", materialController.deleteMaterial);

export default router;

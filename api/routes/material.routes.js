import express from "express";
import materialController from "../controllers/material.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
const router = express.Router();

//Public
router.get("/", materialController.getAllMaterials);
//Privé ADMIN
router.use(authenticateJWT);
router.post("/", authenticateAdmin, materialController.createMaterials);
router.patch(
  "/:materialId",
  authenticateAdmin,
  materialController.updateMaterials
);
router.delete(
  "/:materialId",
  authenticateAdmin,
  materialController.deleteMaterial
);

export default router;

import express from "express";
import statisticController from "../controllers/statistic/index.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
const router = express.Router();

//Privé ADMIN
router.use(authenticateJWT);
router.get("/:year", authenticateAdmin, statisticController.getAllStatistics);

export default router;

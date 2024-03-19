import express from "express";
import statisticController from "../controllers/statistic/index.controller.js";
const router = express.Router();


router.get("/:year", statisticController.getAllStatistics);

export default router;

import express from 'express'
const router = express.Router();
import creditsController from '../controllers/credits.controller.js';

router.get("/", creditsController.getAllCredits);

export default router;
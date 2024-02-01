import express from 'express'
const router = express.Router();
import creditController from '../controllers/credit.controller.js';

router.get("/", creditController.getAllCredits);
router.post("/", creditController.createCredit);
router.delete("/:productsByOrderId", creditController.deleteCredit);
router.patch("/:productsByOrderId", creditController.archiveCredit);


export default router;
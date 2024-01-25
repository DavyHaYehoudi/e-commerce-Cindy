import express from 'express'
const router = express.Router();
import clientController from '../controllers/client.controller.js';

router.get("/", clientController.getAllClients);
router.get("/:clientId", clientController.getClientById);

export default router;
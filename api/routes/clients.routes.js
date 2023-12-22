import express from 'express'
const router = express.Router();
import clientsController from '../controllers/clients.controller.js';

router.get("/", clientsController.getAllClients);
router.get("/:clientId", clientsController.getClientById);

export default router;
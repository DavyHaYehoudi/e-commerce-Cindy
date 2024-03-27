import express from "express";
const router = express.Router();
import clientController from "../controllers/clientsController/client.controller.js";
import clientsController from "../controllers/clientsController/filter/index.controller.js";

router.get("/", clientsController.getAllClients);
router.get("/:clientId", clientController.getCustomerInfos);
router.patch("/:clientId", clientController.updateClient);
router.patch("/:clientId/notesAdmin", clientController.notesAdmin);

export default router;

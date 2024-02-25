import express from "express";
const router = express.Router();
import clientController from "../controllers/client.controller.js";

router.get("/", clientController.getAllClients);
router.get("/:clientId", clientController.getCustomerInfos);
router.patch("/:clientId", clientController.updateClient);
router.patch("/addNote/:clientId", clientController.addNoteAdmin);
router.patch("/removeNote/:clientId/:noteId", clientController.removeNoteAdmin);

export default router;

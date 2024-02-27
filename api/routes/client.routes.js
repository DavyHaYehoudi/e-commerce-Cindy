import express from "express";
const router = express.Router();
import clientController from "../controllers/client.controller.js";

router.get("/", clientController.getAllClients);
router.get("/:clientId", clientController.getCustomerInfos);
router.patch("/:clientId", clientController.updateClient);
router.patch("/:clientId/addNote", clientController.addNoteAdmin);
router.patch("/:clientId/removeNote/:noteId", clientController.removeNoteAdmin);

export default router;

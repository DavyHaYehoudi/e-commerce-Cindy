import express from "express";
const router = express.Router();
import clientController from "../controllers/client.controller.js";

router.get("/", clientController.getAllClients);
router.get("/:clientId", clientController.getClientById);
router.patch("/addNote/:clientId", clientController.addNoteAdmin);
router.patch("/removeNote/:clientId/:noteId", clientController.removeNoteAdmin);

export default router;

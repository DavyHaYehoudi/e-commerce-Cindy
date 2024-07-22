import express from "express";
const router = express.Router();
import clientController from "../controllers/clientsController/client.controller.js";
import clientsController from "../controllers/clientsController/filter/index.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
import authenticateUser from "../controllers/authentication/authenticateUser.js";

//Privé
router.use(authenticateJWT);
//Privé ADMIN
router.get("/", authenticateAdmin, clientsController.getAllClients);
router.patch(
  "/:clientId/notesAdmin",
  authenticateAdmin,
  clientController.notesAdmin
);
//Privé USER
router.get("/:clientId", authenticateUser, clientController.getCustomerInfos);
router.patch("/:clientId", authenticateUser, clientController.updateClient);

export default router;

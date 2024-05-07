import express from "express";
import collectionController from "../controllers/collection.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
const router = express.Router();

//Public
router.get("/", collectionController.getCollections);

//Privé ADMIN
router.use(authenticateJWT);
router.post("/", authenticateAdmin, collectionController.createCollection);
router.put(
  "/:collectionId",
  authenticateAdmin,
  collectionController.updateCollection
);
router.delete(
  "/:collectionId",
  authenticateAdmin,
  collectionController.deleteCollection
);
router.delete(
  "/confirm-delete/:collectionId",
  authenticateAdmin,
  collectionController.confirmDeleteCollection
);

export default router;
 
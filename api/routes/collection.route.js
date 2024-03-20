import express from "express";
import collectionController from "../controllers/collection.controller.js";
const router = express.Router();

router.get("/", collectionController.getCollections);
router.post("/", collectionController.createCollection);
router.put("/:collectionId", collectionController.updateCollection);
router.delete("/:collectionId", collectionController.deleteCollection);

export default router;
import express from "express";
import tagController from "../controllers/tag.controller.js";
const router = express.Router();

router.get("/", tagController.getTags);
router.post("/", tagController.createTag);
router.put("/:tagId", tagController.updateTag);
router.delete("/:tagId", tagController.deleteTag);

export default router;

import express from "express";
import tagController from "../controllers/tag.controller.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
const router = express.Router();

//Public
router.get("/", tagController.getTags);
//Privé ADMIN
router.use(authenticateJWT);
router.post("/",authenticateAdmin, tagController.createTag);
router.put("/:tagId",authenticateAdmin, tagController.updateTag);
router.delete("/:tagId",authenticateAdmin, tagController.deleteTag);

export default router;

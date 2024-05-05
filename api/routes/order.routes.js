import express from "express";
const router = express.Router();
import orderController from "../controllers/order.controller.js";
import sendToClientController from "../controllers/sendToClient/index.js";
import authenticateAdmin from "../controllers/authentication/authenticateAdmin.js";
import authenticateUser from "../controllers/authentication/authenticateUser.js";
import authenticateJWT from "../controllers/authentication/authenticateJWT.js";

//Privé ADMIN
router.use(authenticateJWT);
router.get("/", authenticateAdmin, orderController.getAllOrders);
router.patch(
  "/:orderId",
  authenticateAdmin,
  sendToClientController.updateOrder
);

//Privé USER
router.post(
  "/:orderId/trackingnumber_client",
  authenticateUser,
  orderController.createTrackingNumberClient
);
router.delete(
  "/:orderId/trackingnumber_client/:trackingNumberId",
  authenticateUser,
  orderController.deleteTrackingNumberClient
);
export default router;

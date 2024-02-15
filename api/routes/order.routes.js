import express from "express";
const router = express.Router();
import orderController from "../controllers/order.controller.js";
import sendToClientController from "../controllers/sendToClient/index.js";

router.get("/", orderController.getAllOrders);
router.post(
  "/trackingnumber_client/:orderId",
  orderController.createTrackingNumberClient
);
router.delete(
  "/trackingnumber_client/:orderId",
  orderController.deleteTrackingNumberClient
);
router.patch("/:orderId", sendToClientController.updateOrder);

export default router;

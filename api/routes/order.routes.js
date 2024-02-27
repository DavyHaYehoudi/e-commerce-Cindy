import express from "express";
const router = express.Router();
import orderController from "../controllers/order.controller.js";
import sendToClientController from "../controllers/sendToClient/index.js";

router.get("/", orderController.getAllOrders);
router.post(
  "/:orderId/trackingnumber_client",
  orderController.createTrackingNumberClient
);
router.delete(
  "/:orderId/trackingnumber_client/:trackingNumberId",
  orderController.deleteTrackingNumberClient
);
router.patch("/:orderId", sendToClientController.updateOrder);

export default router;
 
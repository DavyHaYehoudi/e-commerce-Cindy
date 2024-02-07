import Order from "../models/order.model.js";
const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    // Implementation for getting a client by ID
  },

  createOrder: async (req, res) => {
    // Implementation for creating a new client
  },
  updateOrder:async(req,res)=>{
    console.log("req params ---------- :",req.params);
    console.log("req.body ---------- :", req.body);
  },

  // updateOrder: async (req, res) => {
  //   // ******************** Start Passage à l'étape suivante ********************
  //   const ordersActions = [
  //     { id: 0, number: 0 },
  //     { id: 1, number: 1 },
  //     { id: 2, number: 2 },
  //     { id: 3, number: 3 },
  //     { id: 4, number: 4 },
  //     { id: 5, number: 5 },
  //     { id: 6, number: 6 },
  //   ];

  //   const updateMoveToNextStep = (
  //     order,
  //     { step, isClientNotified, isNextStepOrder }
  //   ) => {
  //     const currentStepIndex = ordersActions.findIndex(
  //       (s) => s.number === order.step
  //     );

  //     const nextStepIndex = (currentStepIndex + 1) % ordersActions.length;
  //     const nextStep = isNextStepOrder
  //       ? ordersActions[nextStepIndex].number
  //       : step;

  //     order.step = nextStep;
  //     order.isClientNotified = isClientNotified;
  //     return {
  //       $set: {
  //         step: nextStep,
  //         isClientNotified,
  //       },
  //     };
  //   };
  //   // ******************** End Passage à l'étape suivante ********************
  //   // ******************** Start TrackingNumber ********************
  //   const updateOrderTrackingNumber = (action) => {
  //     const { actionType } = action;
  //     switch (actionType) {
  //       case "trackingNumberAddAdmin":
  //         return trackingNumberAddAdmin(action);
  //       case "trackingNumberDelete":
  //         return trackingNumberDelete(action);
  //       case "trackingNumberUpdatedClient":
  //         return trackingNumberUpdatedClient(action);
  //       default:
  //         return null;
  //     }
  //   };
  //   const trackingNumberAddAdmin = ({ trackingNumber }) => ({
  //     $push: {
  //       trackingNumber: trackingNumber,
  //     },
  //   });

  //   const trackingNumberDelete = ({ trackingNumber }) => ({
  //     $pull: {
  //       trackingNumber: { _id: trackingNumber._id },
  //     },
  //   });
  //   let arrayFilters;
  //   const trackingNumberUpdatedClient = ({ trackingNumber }) => {
  //     arrayFilters = [{ "elem._id": trackingNumber._id }];

  //     return {
  //       $set: {
  //         "trackingNumber.$[elem].productsByOrder":
  //           trackingNumber.productsByOrder,
  //       },
  //     };
  //   };

  //   // ******************** End TrackingNumber ********************
  //   try {
  //     const { orderId } = req.params;
  //     const { actionType, movement, isClientNotified, step, amount } = req.body;

  //     const existingOrder = await Order.findById(orderId);
  //     if (!existingOrder) {
  //       return res.status(404).json({ error: "Order not found" });
  //     }

  //     let updateQuery;
  //     let updatedOrder;

  //     switch (actionType) {
  //       case "moveToNextStep":
  //         updateQuery = updateMoveToNextStep(existingOrder, req.body);
  //         break;
  //       case "cancelOrder":
  //         updateQuery = {
  //           $set: { isClientNotified, step },
  //         };
  //         break;
  //       case "reactivateOrder":
  //         updateQuery = {
  //           $set: { isClientNotified, step },
  //         };
  //         break;
  //       case "sendToClient":
  //         updateQuery = {
  //           $set: { isClientNotified, lastSentDateToClient: new Date() },
  //         };
  //         break;
  //       case "totalsInOut":
  //         updateQuery = {
  //           $inc: {
  //             outTotalAmount: movement === "out" ? amount : -amount,
  //           },
  //           $set: { isClientNotified: false },
  //         };
  //         break;
  //       case "trackingNumberAddAdmin":
  //       case "trackingNumberDelete":
  //       case "trackingNumberUpdatedClient":
  //         updateQuery = updateOrderTrackingNumber(req.body);
  //         break;
  //       default:
  //         return res.status(400).json({ error: "Invalid action type" });
  //     }
  //     updatedOrder = await Order.findOneAndUpdate(
  //       { _id: orderId },
  //       updateQuery,
  //       { new: true, arrayFilters }
  //     );

  //     if (!updatedOrder) {
  //       return res.status(404).json({ error: "Order not found" });
  //     }

  //     res.status(200).json({
  //       message: "Order updated successfully",
  //       updatedOrder,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
  deleteOrder: async (req, res) => {
    // Implementation for deleting a client
  }, 
};

export default orderController;
 
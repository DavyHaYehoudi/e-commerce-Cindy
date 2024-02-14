import Order from "../../models/order.model.js";

export const updateOrder = async (
  orderId,
  trackingNumberList,
  step,
  outTotalAmount,
  lastSentDateToClient
  ) => {
  console.log('trackingNumberList:', trackingNumberList)
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      console.error("Commande non trouvée");
      return;
    }
    await Order.updateOne(
      { _id: orderId },
      {
        $set: {
          trackingNumber: trackingNumberList,
          step,
          outTotalAmount,
          lastSentDateToClient,
        },
      },
      { runValidators: true }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la commande :", error);
    throw error
  }
};

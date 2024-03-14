import Credit from "../models/credit.model.js";
import Order from "../models/order.model.js";
import OrderProducts from "../models/orderProducts.model.js";

const creditController = {
  getAllCredits: async (req, res) => {
    try {
      const { orderProductsIds } = req.query;
      const parsedProductsByOrderIds = JSON.parse(orderProductsIds);

      const credits = await Credit.find({
        orderProductsId: { $in: parsedProductsByOrderIds },
        archived: false,
      }).exec();

      res.status(200).json(credits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  archiveCredit: async (req, res) => {
    const { orderProductsId } = req.params;

    try {
      // Mettre à jour le crédit
      const updatedCredit = await Credit.findOneAndUpdate(
        { orderProductsId },
        { $set: { archived: true } },
        { new: true }
      );

      if (!updatedCredit) {
        return res
          .status(404)
          .json({ error: "Ressource dans Credit non trouvée" });
      }

      // Mettre à jour les OrderProducts
      const updatedOrderProducts = await OrderProducts.findByIdAndUpdate(
        orderProductsId,
        { $set: { "orderProductsActions.credit": null } },
        { new: true }
      );

      if (!updatedOrderProducts) {
        return res
          .status(404)
          .json({ error: "Ressource dans OrderProducts non trouvée" });
      }

      // Trouver l'ID de l'Order associé à l'OrderProducts
      const order = await Order.findOne({ orderProducts: orderProductsId });

      if (!order) {
        return res.status(404).json({ error: "Order associé non trouvé" });
      }

      // Mettre à jour outTotalAmount de l'Order
      const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        { $inc: { outTotalAmount: -updatedCredit.amount } },
        { new: true }
      );

      res
        .status(200)
        .json({ updatedCredit, updatedOrderProducts, updatedOrder });
    } catch (error) {
      console.error("Error archiving credit:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default creditController;

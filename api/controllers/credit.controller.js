import Credit from "../models/credit.model.js";
import Order from "../models/order.model.js";
import ProductsByOrder from "../models/productsByOrder.model.js";
const creditController = {
  getAllCredits: async (req, res) => {
    try {
      const credit = await Credit.find();
      res.status(200).json(credit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createCredit: async (req, res) => {
    try {
      const { productsByOrderId, amount, dateExpire, orderId } = req.body;

      if (!productsByOrderId || !amount || !dateExpire || !orderId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newCredit = await Credit.create({
        productsByOrderId,
        amount,
        dateExpire,
      });

      // Mise à jour de la propriété isClientNotified dans ProductsByOrder
      const updatedProductsByOrder = await ProductsByOrder.findOneAndUpdate(
        { _id: productsByOrderId },
        {
          $set: {
            isClientNotified: false,
            "productsByOrderActions.credit": productsByOrderId,
          },
        },
        { new: true }
        );

      // Mise à jour de la propriété isClientNotified et outTotalAmount dans Order en utilisant l'_id
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        {
          $set: { isClientNotified: false },
          $inc: { outTotalAmount: amount },
        },
        { new: true }
      );

      // Vérification si les deux mises à jour ont réussi avant de renvoyer la réponse
      if (updatedProductsByOrder && updatedOrder) {
        res.status(201).json(newCredit);
      } else {
        // Si l'une des mises à jour a échoué
        res
          .status(500)
          .json({ error: "Failed to update one or more properties" });
      }
    } catch (error) {
      console.error("Error creating credit:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  deleteCredit: async (req, res) => {
    try {
      const { productsByOrderId } = req.params;
      const { orderId, amount } = req.query;

      if (!productsByOrderId || !amount || !orderId) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const credit = await Credit.findOne({
        productsByOrderId: productsByOrderId,
      });

      if (!credit) {
        return res.status(404).json({ error: "Credit not found" });
      }
      await Credit.findOneAndDelete({ productsByOrderId: productsByOrderId });
      await Order.findOneAndUpdate(
        { _id: orderId },
        {
          $inc: { outTotalAmount: -amount },
        }
      );
      await ProductsByOrder.findOneAndUpdate(
        { _id: productsByOrderId },
        {
          $set: {
            "productsByOrderActions.credit": null,
          },
        },
        { new: true }
      );
      res.status(200).json({});
    } catch (error) {
      console.error("Error deleting credit:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  archiveCredit: async (req, res) => {
    const { productsByOrderId } = req.params;

    try {
      const credit = await Credit.findOne({ productsByOrderId });
      if (!credit) {
        return res.status(404).json({ error: "Ressource non trouvée" });
      }
      credit.archived = true;
      await credit.save();
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting credit:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default creditController;

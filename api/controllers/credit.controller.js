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
        isArchived: false,
      }).exec();

      res.status(200).json(credits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  archiveCredit: async (req, res) => {
    const { orderProductsId } = req.params;
    const { isArchived } = req.body;

    try {
      // Vérifier si req.body.isArchived est true
      if (isArchived === true) {
        // Mettre à jour le crédit
        const updatedCredit = await Credit.findOneAndUpdate(
          { orderProductsId },
          { $set: { isArchived: true } },
          { new: true }
        );

        if (!updatedCredit) {
          return res.status(404).json({ message: "Le crédit n'existe pas." });
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
            .json({ message: "OrderProducts n'existe pas" });
        }

        // Trouver l'ID de l'Order associé à l'OrderProducts
        const order = await Order.findOne({ orderProducts: orderProductsId });

        if (!order) {
          return res
            .status(404)
            .json({ message: "La commande associée n'existe pas." });
        }

        // Mettre à jour outTotalAmount de l'Order
        await Order.findByIdAndUpdate(
          order._id,
          { $inc: { outTotalAmount: -updatedCredit.amount } },
          { new: true }
        );

        res.status(200).json({ updatedCredit });
      } else {
        // Si isArchived n'est pas true, renvoyer un message d'erreur
        return res.status(400).json({ error: "isArchived doit être true" });
      }
    } catch (error) {
      console.error("Error archiving credit:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  verifyCredit: async (req, res) => {
    try {
      const { clientId, creditId } = req.query;
      const credit = await Credit.findById(creditId);
      if (!credit) {
        return res.status(404).json({ message: "L'avoir n'existe pas." });
      }
      if (credit?.dateExpire < new Date()) {
        return res
          .status(404)
          .json({ message: "La date de validité a expiré." });
      }
      if (credit?.clientId.toString() !== clientId) {
        return res
          .status(401)
          .json({ message: "Vous n'êtes pas autorisé à utiliser cet avoir." });
      }

      res.status(200).json({ amount: credit?.amount });
    } catch (error) {
      console.error("Error verify credit:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default creditController;

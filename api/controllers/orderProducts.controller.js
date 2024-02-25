import OrderProducts from "../models/orderProducts.model.js";
const orderProductsController = {
  getAllProducts: async (req, res) => {
    try {
      const { orderProductsIds } = req.query;
      const parsedProductsByOrderIds = JSON.parse(orderProductsIds);

      const orders = await OrderProducts.find({
        _id: { $in: parsedProductsByOrderIds },
      }).exec();

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductsById: async (req, res) => {
    // Implementation for getting a client by ID
  },
  addNote: async (req, res) => {
    const { orderProductsId } = req.params;
    const { content } = req.body;
    try {
      const orderProducts = await OrderProducts.findById(orderProductsId);
      if (!orderProducts) {
        return res.status(404).json({ error: "OrderProducts not found" });
      }
      const note = await OrderProducts.updateOne(
        { _id: orderProductsId },
        { $set: { "orderProductsActions.note": content } },
        { runValidators: true }
      );
      res.status(200).json({ note });
    } catch (error) {
      return res.status(500).json({
        error: `Erreur interne du serveur : ${error.message}`,
      });
    }
  },
};

export default orderProductsController;

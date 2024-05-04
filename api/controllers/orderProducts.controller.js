import OrderProducts from "../models/orderProducts.model.js";
const orderProductsController = {
  getAllProducts: async (req, res) => {
    const { client } = req;
    if (client.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
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

  addNote: async (req, res) => {
    const { client } = req;
    if (client.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
    const { orderProductsId } = req.params;
    const { content } = req.body;
    try {
      const orderProducts = await OrderProducts.findById(orderProductsId);
      if (!orderProducts) {
        return res.status(404).json({ error: "OrderProducts n'existe pas" });
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

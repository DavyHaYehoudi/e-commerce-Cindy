import ProductsByOrder from "../models/productsByOrder.model.js";
const productsByOrderController = {
  getAllProducts: async (req, res) => {
    try {
      const productsByOrder = await ProductsByOrder.find();
      res.status(200).json(productsByOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductsById: async (req, res) => {
    // Implementation for getting a client by ID
  },
  addNote: async (req, res) => {
    const {productsbyorderId} = req.params
    const {content}=req.body
    try {
      const note = await ProductsByOrder.updateOne(
        { _id: productsbyorderId },
        { $set: { "productsByOrderActions.note": content } },
        { runValidators: true }
      );
      res.status(200).json({note})
    } catch (error) {
      return res.status(500).json({
        error: `Erreur interne du serveur : ${error.message}`,
      });
    }
  },
};

export default productsByOrderController;

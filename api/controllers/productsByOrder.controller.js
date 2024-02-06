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

  updateProducts: async (req, res) => {
    const { productsByOrderId } = req.params;
    const {
      updatedProperty,
      isClientNotified,
      productActionContent,
      creditContent,
    } = req.body;

    const updateQuery = {};

    if (
      updatedProperty === "exchange" ||
      updatedProperty === "refund" ||
      updatedProperty === "note"
    ) {
      updateQuery[`productsByOrderActions.${updatedProperty}`] =
        productActionContent;
    } else if (updatedProperty === "credit") {
      updateQuery["productsByOrderActions.credit"] = creditContent;
    }
    try {
      const updatedProduct = await ProductsByOrder.findOneAndUpdate(
        { _id: productsByOrderId },
        {
          $set: {
            isClientNotified,
            ...updateQuery,
          },
        },
        { new: true }
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default productsByOrderController;

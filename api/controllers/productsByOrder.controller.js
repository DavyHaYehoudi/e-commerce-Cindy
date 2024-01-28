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

  createProducts: async (req, res) => {
    // Implementation for creating a new client
  },

  updateProducts: async (req, res) => {
    // Implementation for updating a client
  },

  deleteProducts: async (req, res) => {
    // Implementation for deleting a client
  },
};

export default productsByOrderController;

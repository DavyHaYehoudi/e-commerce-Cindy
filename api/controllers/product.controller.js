import Product from "../models/product.model.js";
const productController = {
  getAllProduct: async (req, res) => {
    try {
      const product = await Product.find();
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductById: async (req, res) => {
    // Implementation for getting a client by ID
  },

  createProduct: async (req, res) => {
    try {
      const product = await Product.create({...req.body})
      res.status(201).json(product)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    // Implementation for updating a client
  },

  deleteProduct: async (req, res) => {
    // Implementation for deleting a client
  },
};

export default productController; 

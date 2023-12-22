import { productMock } from "../mocks/productMock.js";
const productController = {
  getAllProduct: async (req, res) => {
    console.log("dans le controller getAllProduct");
    res.status(200).json(productMock);
  },

  getProductById: async (req, res) => {
    // Implementation for getting a client by ID
  },

  createProduct: async (req, res) => {
    // Implementation for creating a new client
  },

  updateProduct: async (req, res) => {
    // Implementation for updating a client
  },

  deleteProduct: async (req, res) => {
    // Implementation for deleting a client
  },
};

export default productController;

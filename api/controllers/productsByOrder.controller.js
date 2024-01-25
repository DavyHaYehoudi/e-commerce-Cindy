import { productsByOrderMock } from "../mocks/productsByOrderMock.js";
const productsByOrderController = {
  getAllProducts: async (req, res) => {
    console.log("dans le controller getAllProducts");
    res.status(200).json(productsByOrderMock);
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

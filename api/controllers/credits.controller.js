import { creditsMock } from "../mocks/creditsMock.js";
const creditsController = {
  getAllCredits: async (req, res) => {
    console.log("dans le controller getAllCredits");
    res.status(200).json(creditsMock);
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

export default creditsController;

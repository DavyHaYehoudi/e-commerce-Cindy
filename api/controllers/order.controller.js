import { ordersMock } from "../mocks/ordersMock.js";
const orderController = {
  getAllOrders: async (req, res) => {
    console.log("dans le controller getAllOrders");
    res.status(200).json(ordersMock);
  },

  getOrderById: async (req, res) => {
    // Implementation for getting a client by ID
  },

  createOrder: async (req, res) => {
    // Implementation for creating a new client
  },

  updateOrder: async (req, res) => {
    // Implementation for updating a client
  },

  deleteOrder: async (req, res) => {
    // Implementation for deleting a client
  },
};

export default orderController;

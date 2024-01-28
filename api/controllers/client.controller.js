import { clientsMock } from "../mocks/clientsMock.js";
import { creditMock } from "../mocks/creditMock.js";
import { ordersMock } from "../mocks/ordersMock.js";
import { productsByOrderMock } from "../mocks/productsByOrderMock.js";
import Client from "../models/client.model.js";

const clientController = {
  getAllClients: async (req, res) => {
    try {
      const clients = await Client.find();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClientById: async (req, res) => {
    const { clientId } = req.params;
    console.log("clientId:", clientId);

    try {
      // Recherche du client dans le mock
      const client = clientsMock.find((c) => c.id === clientId);
      //attention de bien exclure notesAdmin avec .select('-notesAdmin')

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      // Récupération des commandes associées au client dans le mock
      const clientOrdersIds = client.orders;
      const orders = ordersMock.filter((order) =>
        clientOrdersIds.includes(order.id)
      );

      // Récupération des produits associés aux commandes dans le mock
      const orderProductIds = orders.reduce((acc, order) => {
        acc.push(...order.productsByOrder);
        return acc;
      }, []);

      const productsByOrder = productsByOrderMock.filter((item) =>
        orderProductIds.includes(item.id)
      );

      // Récupération des crédits associés au client dans le mock
      const creditIds = productsByOrder.map(
        (product) => product?.productsByOrderActions?.credit
      );

      // Filtrer les détails des crédits correspondants
      const credit = creditMock.filter((credit) =>
        creditIds.includes(credit.productsByOrderId)
      );

      res.json({ client, orders, productsByOrder, credit });
    } catch (error) {
      console.error("Error fetching client data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createClient: async (req, res) => {
    // Implementation for creating a new client
  },

  updateClient: async (req, res) => {
    // Implementation for updating a client
  },

  deleteClient: async (req, res) => {
    // Implementation for deleting a client
  },
};

export default clientController;

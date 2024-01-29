import Client from "../models/client.model.js";
import Credit from "../models/credit.model.js";

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
      // Recherche du client dans la base de données MongoDB avec les commandes et les produits associés
      const client = await Client.findById(clientId).populate({
        path: "orders",
        populate: {
          path: "productsByOrder",
          model: "ProductsByOrder",
        },
      });

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      const orders = client.orders;

      // Utilisation de flatMap pour obtenir directement les produits associés aux commandes
      const productsByOrder = orders.flatMap((order) => order.productsByOrder);

      // Utilisation de map pour récupérer les crédits associés aux produits
      const creditIds = productsByOrder
        .map((product) => product?.productsByOrderActions?.credit)
        .filter(Boolean);

      // Récupération des crédits associés au client
      const credit = await Credit.find({ productsByOrderId: { $in: creditIds } });

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

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

    try {
      const client = await Client.findById(clientId)
        .select("-notesAdmin")
        .populate({
          path: "orders",
          populate: {
            path: "productsByOrder",
            model: "ProductsByOrder",
          },
        });

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      const ordersWithoutNote = client.orders.map((order) => {
        const productsByOrderWithoutNote = order.productsByOrder.map(
          (product) => {
            const { productsByOrderActions, ...rest } = product.toJSON();
            const productsByOrderActionsWithoutNote = {
              ...productsByOrderActions,
              note: undefined,
            };
            return {
              ...rest,
              productsByOrderActions: productsByOrderActionsWithoutNote,
            };
          }
        );
        return {
          ...order.toJSON(),
          productsByOrder: productsByOrderWithoutNote,
        };
      });

      const creditIds = ordersWithoutNote.flatMap((order) =>
        order.productsByOrder
          .map((product) => product?.productsByOrderActions?.credit)
          .filter(Boolean)
      );

      const credit = await Credit.find({
        productsByOrderId: { $in: creditIds },
      });

      const productsByOrder = ordersWithoutNote.flatMap(
        (order) => order.productsByOrder
      );

      res.json({
        client: { ...client.toJSON() },
        orders: ordersWithoutNote,
        credit,
        productsByOrder,
      });
    } catch (error) {
      console.error("Error fetching client data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createClient: async (req, res) => {
    // Implementation for creating a new client
  },

  updateClient: async (req, res) => {
    const { clientId } = req.params;
    const updateFields = req.body;

    try {
    const client = await Client.findById(clientId)
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    // Liste des champs à exclure de la mise à jour
    const fieldsToExclude = ["totalOrders", "totalOrderValue", "orders"];

    // Filtrer les champs indésirables du req.body
    const filteredUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(
        ([key]) => !fieldsToExclude.includes(key)
      )
    );

      await Client.findOneAndUpdate(
        { _id: clientId },
        {
          $set: filteredUpdateFields,
        },
        { new: true, runValidators: true }
      );

      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteClient: async (req, res) => {
    // Implementation for deleting a client
  },

  addNoteAdmin: async (req, res) => {
    const { clientId } = req.params;
    const { content } = req.body;
    try {
      const currentDate = new Date();
      const newNote = { content, date: currentDate };

      const updatedClient = await Client.findOneAndUpdate(
        { _id: clientId },
        { $push: { notesAdmin: newNote } },
        { new: true, runValidators: true }
      );
      const index =
        updatedClient.notesAdmin[updatedClient.notesAdmin.length - 1];

      res.status(200).json({
        _id: index._id,
        date: index.date,
        clientId,
        content,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeNoteAdmin: async (req, res) => {
    const { clientId, noteId } = req.params;

    try {
      const updatedClient = await Client.findOneAndUpdate(
        { _id: clientId },
        { $pull: { notesAdmin: { _id: noteId } } },
        { new: true }
      );
      res.status(200).json(updatedClient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
};

export default clientController;

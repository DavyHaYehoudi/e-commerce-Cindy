import Client from "../../models/client.model.js";
import Order from "../../models/order.model.js";
import OrderProducts from "../../models/orderProducts.model.js";
import Credit from "../../models/credit.model.js";
import Giftcard from "../../models/giftcard.model.js";

const clientController = {
  getCustomerInfos: async (req, res) => {
    const { clientId } = req.params;
    try {
      const client = await Client.findById(clientId).select("-notesAdmin -authentication");
      if (!client) {
        return res.status(404).json({ message: "L'utilisateur n'existe pas." });
      }
      const orders = await Order.find({ clientId });
      const orderIds = orders.map((order) => order._id.toString());
      const orderProducts = await OrderProducts.find({
        orderId: { $in: orderIds },
      }).select("-orderProductsActions.note");
      const giftcard = await Giftcard.find({ buyerId: clientId });
      const credit = await Credit.find({ clientId, isArchived: false });
      res.json({
        client,
        orders,
        credit,
        giftcard,
        orderProducts,
      });
    } catch (error) {
      console.error("Error fetching client data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  updateClient: async (req, res) => {
    const { clientId } = req.params;
    const updateFields = req.body;
    // console.log('updateFields:', updateFields)

    try {
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ error: "L'utilisateur n'existe pas." });
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

      res.status(200).json({message : "Les modifications ont bien été effectuées"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  notesAdmin: async (req, res) => {
    const { client } = req;
    if (client.role !== 'admin') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas un administrateur." });
    }
  
    try {
      const { clientId } = req.params;
      const { content, noteId } = req.body;

      if (content && !noteId) {
        try {
          const client = await Client.findById(clientId);
          if (!client) {
            return res.status(404).json({ error: "L'utilisateur n'existe pas." });
          }
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
            type: "addingNote",
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else if (noteId && !content) {
        try {
          const client = await Client.findById(clientId);
          if (!client) {
            return res.status(404).json({ error: "L'utilisateur n'existe pas." });
          }
          await Client.findOneAndUpdate(
            { _id: clientId },
            { $pull: { notesAdmin: { _id: noteId } } },
            { new: true }
          );
          res.status(200).json({ type: "deletingNote", clientId, noteId });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default clientController;
 
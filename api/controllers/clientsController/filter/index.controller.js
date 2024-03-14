import Client from "../../../models/client.model.js";
import process from "./process.js";

const clientsController = {
  getAllClients: async (req, res) => {
    try {
      // console.log("req.query :", req.query);
      let totalClientsCount;
      const {
        itemsPerPage,
        name,
        credit,
        exchange,
        refund,
        note,
        steps,
        trackingNumber,
        preciseDate,
        rangeDateStart,
        rangeDateEnd,
      } = req.query;

      // Vérifier si un nombre limité est demandé
      if (itemsPerPage.trim() !== "" && parseInt(itemsPerPage) !== -1) {
        let query = await Client.find();
        const clientsLimit = query.slice(0, parseInt(itemsPerPage));
        totalClientsCount = await Client.countDocuments();
        res.status(200).json({ clients: clientsLimit, totalClientsCount });
        return;
      }

      const clients = await process(
        name,
        credit,
        exchange, 
        refund,
        note,
        steps,
        trackingNumber,
        preciseDate,
        rangeDateStart,
        rangeDateEnd
      );
      totalClientsCount = clients.length;
      res.status(200).json({ clients, totalClientsCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default clientsController;

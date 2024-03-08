import Client from "../models/client.model.js";
import Credit from "../models/credit.model.js";
import Order from "../models/order.model.js";
import OrderProducts from "../models/orderProducts.model.js";

const clientController = {
  getAllClients: async (req, res) => {
    try {
      let clients = new Set();
      let totalClientsCount;
      console.log("req.query :", req.query);
      const {
        itemsPerPage,
        name,
        credit,
        exchange,
        refund,
        note,
        steps,
        trackingNumber,
      } = req.query;

      // Vérifier si itemsPerPage est la seule query
      if (
        name === "" &&
        credit === "" &&
        exchange === "" &&
        refund === "" &&
        note === "" &&
        steps === "" &&
        trackingNumber === ""
      ) {
        let query = Client.find();

        if (parseInt(itemsPerPage) !== -1) {
          query = query.limit(parseInt(itemsPerPage));
        }

        query = query.sort({ _id: 1 });
        const clientsResult = await query.exec();
        clientsResult.forEach((client) => clients.add(client));
        totalClientsCount = await Client.countDocuments();
        res
          .status(200)
          .json({ clients: Array.from(clients), totalClientsCount });
        return;
      }

      // Construire les filtres pour chaque collection
      const queryInClient = {};
      const queryInOrder = {};
      const queryInOrderProducts = {};

      // Ajouter les critères à la requête en fonction de leur existence
      if (name && name.trim() !== "") {
        queryInClient.$or = [
          { firstName: { $regex: new RegExp(name, "i") } },
          { lastName: { $regex: new RegExp(name, "i") } },
        ];
      }
      if (note && note.trim() !== "") {
        queryInClient.notesAdmin = { $type: "array", $not: { $size: 0 } };
      }

      if (trackingNumber && trackingNumber.trim() !== "") {
        console.log("entree dans trackingNumber");
        queryInOrder.trackingNumber = {
          $type: "array",
          $not: { $size: 0 },
        };
      }
      if (steps && steps.trim() !== "") {
        const steps = req.query.steps.split(",").map(Number);
        queryInOrder.step = { $in: steps };
      }

      if (
        credit.trim() !== "" &&
        exchange.trim() !== "" &&
        refund.trim() !== ""
      ) {
        console.log("entree dans le trio");
        queryInOrderProducts.orderProductsActions = {
          credit: { $ne: null },
          exchange: { $ne: null },
          refund: { $ne: null },
        };
      }

      // Effectuer les recherches dans chaque collection
      const clientsInClient = await Client.find(queryInClient);

      // Ajouter les clients de la collection Client à l'ensemble
      clientsInClient.forEach((client) => clients.add(client));

      // Recherche dans la collection Order seulement si des filtres sont définis
      if (Object.keys(queryInOrder).length !== 0) {
        const ordersInOrder = await Order.find(queryInOrder);
        const orderIds = [];

        for (const order of ordersInOrder) {
          orderIds.push(order._id);
        }
        console.log('clientsWithOrders:', clientsWithOrders)
        clientsWithOrders.forEach((client) => clients.add(client));
      }

      // Recherche dans la collection OrderProducts seulement si des filtres sont définis
      if (Object.keys(queryInOrderProducts).length !== 0) {
        const ordersProductsInOrderProducts = await OrderProducts.find(
          queryInOrderProducts
        );
        for (const orderProducts of ordersProductsInOrderProducts) {
          const order = await Order.findOne({
            orderProducts: orderProducts._id.toString(),
          });
          if (order) {
            const client = await Client.findOne({
              orders: order._id.toString(),
            });
            if (client) {
              clients.add(client); 
            }
          }
        }
      }


      totalClientsCount = clients.size;

      let clientsArray = Array.from(clients);

      if (parseInt(itemsPerPage) !== -1) {
        clientsArray = clientsArray.slice(0, parseInt(itemsPerPage));
      }
      // console.log('clientsArray2:', clientsArray)
      res.status(200).json({ clients: clientsArray, totalClientsCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCustomerInfos: async (req, res) => {
    const { clientId } = req.params;

    try {
      let client = await Client.findById(clientId)
        .select("-notesAdmin")
        .populate({
          path: "orders",
          populate: {
            path: "orderProducts",
            model: "OrderProducts",
          },
        });

      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }

      const ordersWithoutNote = client.orders.map((order) => {
        const orderProductsWithoutNote = order.orderProducts.map((product) => {
          const { orderProductsActions, ...rest } = product.toJSON();
          const orderProductsActionsWithoutNote = {
            ...orderProductsActions,
            note: undefined,
          };
          return {
            ...rest,
            orderProductsActions: orderProductsActionsWithoutNote,
          };
        });
        return {
          ...order.toJSON(),
          orderProducts: orderProductsWithoutNote,
        };
      });

      const creditIds = ordersWithoutNote.flatMap((order) =>
        order.orderProducts
          .map((product) => product?.orderProductsActions?.credit)
          .filter(Boolean)
      );

      const credit = await Credit.find({
        orderProductsId: { $in: creditIds },
      });

      const orderProducts = ordersWithoutNote.flatMap(
        (order) => order.orderProducts
      );

      client = await Client.findById(clientId).select("-notesAdmin -orders");

      res.json({
        client,
        orders: ordersWithoutNote,
        credit,
        orderProducts,
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
      const client = await Client.findById(clientId);
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
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
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
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeNoteAdmin: async (req, res) => {
    const { clientId, noteId } = req.params;

    try {
      const client = await Client.findById(clientId);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
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

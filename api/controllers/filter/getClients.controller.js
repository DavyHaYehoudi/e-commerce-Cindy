import Client from "../../models/client.model.js";
import Order from "../../models/order.model.js";
import OrderProducts from "../../models/orderProducts.model.js";

const clientsController = {
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
        queryInOrder.trackingNumber = {
          $type: "array",
          $not: { $size: 0 },
        };
      }
      if (steps && steps.trim() !== "") {
        const steps = req.query.steps.split(",").map(Number);
        queryInOrder.step = { $in: steps };
      }
      if (credit.trim() !== "") {
        queryInOrderProducts.$or = queryInOrderProducts.$or || [];
        queryInOrderProducts.$or.push({ 'orderProductsActions.credit': { $ne: null } });
      }
      
      if (exchange.trim() !== "") {
        queryInOrderProducts.$or = queryInOrderProducts.$or || [];
        queryInOrderProducts.$or.push({ 'orderProductsActions.exchange': { $ne: null } });
      }
      
      if (refund.trim() !== "") {
        queryInOrderProducts.$or = queryInOrderProducts.$or || [];
        queryInOrderProducts.$or.push({ 'orderProductsActions.refund': { $ne: null } });
      }

      // Recherche dans la collection Client
      if (Object.keys(queryInClient).length !== 0) {
        const clientsInClient = await Client.find(queryInClient);
        // clientsInClient.forEach((client) => clients.add(client));
        clientsInClient.forEach((client) => clients.add(client._id.toString()));
      }

      // Recherche dans la collection Order
      if (Object.keys(queryInOrder).length !== 0) {
        const ordersInOrder = await Order.find(queryInOrder);
        const orderIds = [];

        for (const order of ordersInOrder) {
          orderIds.push(order._id);
        }
        const clientsWithOrders = await Client.find({
          orders: { $in: orderIds },
        });
        clientsWithOrders.forEach((client) => clients.add(client));
      }

      // Recherche dans la collection OrderProducts
      if (queryInOrderProducts.$or && queryInOrderProducts.$or.length > 0) {
        const ordersProductsInOrderProducts = await OrderProducts.find(queryInOrderProducts);

        for (const orderProducts of ordersProductsInOrderProducts) {
          const order = await Order.findOne({
            orderProducts: orderProducts._id,
          })
            // .populate("orderProducts")
            // .exec();
      
          if (order) {
            const clientsWithOrder = await Client.find({ orders: order._id })
            clientsWithOrder.forEach((client) => clients.add(client));
          }
        }
      } 

      console.log('******************************************:', clients)
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
};

export default clientsController;

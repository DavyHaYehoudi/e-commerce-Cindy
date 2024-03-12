import Client from "../../../models/client.model.js";
import Order from "../../../models/order.model.js";
import OrderProducts from "../../../models/orderProducts.model.js";
import { buildClientQuery } from "./clientQueryBuilder.js";
import { buildOrderProductsQuery } from "./orderProductsQueryBuilder.js";
import { buildOrderQuery } from "./orderQueryBuilder.js";

const clientsController = {
  getAllClients: async (req, res) => {
    try {
      console.log("req.query :", req.query);
      let clients = new Set();
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
      if (itemsPerPage.trim()!==""&& parseInt(itemsPerPage) !== -1) {
        let query = await Client.find();
        const clientsLimit = query.slice(0, parseInt(itemsPerPage));
        totalClientsCount = await Client.countDocuments();
        res.status(200).json({ clients: clientsLimit, totalClientsCount });
        return;
      }

      const queryInClient = buildClientQuery(name, note);
      const queryInOrder = buildOrderQuery(
        trackingNumber,
        steps,
        preciseDate,
        rangeDateStart,
        rangeDateEnd
      );
      const queryInOrderProducts = buildOrderProductsQuery(
        credit,
        exchange,
        refund
      );

      // Recherche dans la collection Client
      if (Object.keys(queryInClient).length !== 0) {
        const clientsInClient = await Client.find(queryInClient);
        console.log('clientsInClient:', clientsInClient)
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
        clientsWithOrders.forEach((client) =>
          clients.add(client._id.toString())
        );
      }

      // Recherche dans la collection OrderProducts
      if (queryInOrderProducts.$or && queryInOrderProducts.$or.length > 0) {
        const ordersProductsInOrderProducts = await OrderProducts.find(
          queryInOrderProducts
        );

        for (const orderProducts of ordersProductsInOrderProducts) {
          const order = await Order.findOne({
            orderProducts: orderProducts._id,
          });

          if (order) {
            const clientsWithOrder = await Client.find({ orders: order._id });
            clientsWithOrder.forEach((client) =>
              clients.add(client._id.toString())
            );
          }
        }
      }
        // console.log('***************** clients avant *************************:', clients) 
      let clientsArray = await Promise.all(
        Array.from(clients).map(async (clientId) => {
          return await Client.findById(clientId);
        })
      );
      //   console.log('***************** clientsArray apres *************************:', clientsArray)
      totalClientsCount = clients.size;
      res.status(200).json({ clients: clientsArray, totalClientsCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default clientsController;

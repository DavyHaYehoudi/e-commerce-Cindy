import Client from "../../../models/client.model.js";
import Order from "../../../models/order.model.js";
import OrderProducts from "../../../models/orderProducts.model.js";
import { buildClientQuery } from "./clientQueryBuilder.js";
import { buildOrderProductsQuery } from "./orderProductsQueryBuilder.js";
import { buildOrderQuery } from "./orderQueryBuilder.js";

const process = async (
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
  orderNumber
) => {
  let clients = new Set();
  const queryInClient = buildClientQuery(name, note);
  const queryInOrder = buildOrderQuery(
    trackingNumber,
    steps,
    preciseDate,
    rangeDateStart,
    rangeDateEnd,
    orderNumber
  );
  const queryInOrderProducts = buildOrderProductsQuery(
    credit,
    exchange,
    refund
  );

  // Recherche dans la collection Client
  if (Object.keys(queryInClient).length !== 0) {
    const clientsInClient = await Client.find(queryInClient);
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
    clientsWithOrders.forEach((client) => clients.add(client._id.toString()));
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
  let clientsArray = await Promise.all(
    Array.from(clients).map(async (clientId) => {
      return await Client.findById(clientId);
    })
  );

  return clientsArray;
};

export default process;

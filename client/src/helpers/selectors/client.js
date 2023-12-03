export const getClientinfo = (ordersStore, client) => {
  if (!client) {
    return { orders: [], isAnyOrderClientNotified: true };
  }

  const orders = client.orders.map((orderId) =>
    ordersStore.find((order) => order.id === orderId)
  );

  const isAnyOrderClientNotified = orders.some(
    (order) =>
      !ordersStore.find((oa) => oa.id === order.id)?.isClientNotified
  );
  return { orders, isAnyOrderClientNotified };
};

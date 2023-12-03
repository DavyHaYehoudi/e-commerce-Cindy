import { getOrderInfo } from "./order";

export const getProductsInfo = (
  ordersStore,
  productsStore,
  orderId,
  productId
) => {
  const order = getOrderInfo(ordersStore, orderId);
  // const productsInfo = state
  //   .find((user) => user.id === clientId)
  //   ?.orders.find((order) => order.id === orderId)
  //   ?.products?.find((prod) => prod.productId === productId)?.productsActions;
  const productsInfo = productsStore.find(ps=>ps.productId===productId)?.productsActions;
  // const productsInfo = state.find(
  //   (item) => item.id === productId
  // )?.productsActions;

  //   const orders = client.orders.map((orderId) =>
  //   ordersStore.find((order) => order.id === orderId)
  // );
  const isAnyProductClientNotified = order.products
    ?.map((p) => productsStore.find((ps) => ps.id === p)?.isClientNotified)
    .some((notified) => !notified);

  // const isAnyProductClientNotified = state
  //   .find((user) => user.id === clientId)
  //   ?.orders.find((order) => order.id === orderId)
  //   .products?.some((product) => !product.isClientNotified);

  const productsByOrder = order.products?.map((p) =>
    productsStore.find((ps) => ps.id === p)
  );
  // const productsByOrder = state
  //   .find((user) => user.id === clientId)
  //   ?.orders.find((order) => order.id === orderId)?.products;

  const noteContent = productsInfo?.note;
  const isTagProductExisted =
    productsInfo?.exchange || productsInfo?.refund || productsInfo?.credit;
  return {
    productsInfo,
    isAnyProductClientNotified,
    productsByOrder,
    noteContent,
    isTagProductExisted,
  };
};

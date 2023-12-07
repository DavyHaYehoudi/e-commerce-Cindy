export const getProductsInfo = (
  ordersStore,
  productsStore,
  orderId,
  productId
) => {
  const order = ordersStore?.find((item) => item.id === orderId);

  const productsInfo = productsStore?.find(
    (ps) => ps.productId === productId
  )?.productsActions;
  const articleNumber = productsStore?.find(
    (ps) => ps.productId === productId
  )?.quantity;
  const material = productsStore?.find(
    (ps) => ps.productId === productId
  )?.material;

  const isAnyProductClientNotified = order?.products

    ?.map((p) => productsStore.find((ps) => ps.id === p)?.isClientNotified)
    .some((notified) => !notified);

  const productsByOrder = order?.products?.map((p) =>
    productsStore.find((ps) => ps.id === p)
  );

  const noteContent = productsInfo?.note;
  const isTagProductExisted =
    productsInfo?.exchange || productsInfo?.refund || productsInfo?.credit;
  return {
    productsInfo,
    isAnyProductClientNotified,
    productsByOrder,
    noteContent,
    isTagProductExisted,
    material,
    articleNumber,
  };
};

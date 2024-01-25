export const getProductsInfo = (
  ordersStore,
  productsByOrderStore,
  orderId,
  productId
) => {
  const order = ordersStore?.find((item) => item.id === orderId);

  const productsByOrderInfo = productsByOrderStore?.find(
    (ps) => ps.productId === productId
  )?.productsByOrderActions;
  const articleNumber = productsByOrderStore?.find(
    (ps) => ps.productId === productId
  )?.quantity;
  const material = productsByOrderStore?.find(
    (ps) => ps.productId === productId
  )?.material;

  const isAnyProductClientNotified = order?.productsByOrder

    ?.map((p) => productsByOrderStore?.find((ps) => ps.id === p)?.isClientNotified)
    .some((notified) => !notified);

  const productsByOrderByOrder = order?.productsByOrder?.map((p) =>
    productsByOrderStore?.find((ps) => ps.id === p)
  );

  const noteContent = productsByOrderInfo?.note;
  const isTagProductExisted =
    productsByOrderInfo?.exchange || productsByOrderInfo?.refund || productsByOrderInfo?.credit;
  return {
    productsByOrderInfo,
    isAnyProductClientNotified,
    productsByOrderByOrder,
    noteContent,
    isTagProductExisted,
    material,
    articleNumber,
  };
};

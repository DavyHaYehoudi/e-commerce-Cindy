export const getProductsInfo = (
  ordersStore,
  productsByOrderStore,
  orderId,
  productId
) => {
  const order = ordersStore?.find((item) => item._id === orderId);

  const productsByOrderInfo = productsByOrderStore?.find((ps) => {
    return (
      ps.productId === productId && order?.productsByOrder.includes(ps._id)
    );
  })?.productsByOrderActions;
  const articleNumber = productsByOrderStore?.find(
    (ps) =>
      ps.productId === productId && order?.productsByOrder.includes(ps._id)
  )?.quantity;
  const material = productsByOrderStore?.find(
    (ps) =>
      ps.productId === productId && order?.productsByOrder.includes(ps._id)
  )?.material;

  const isAnyProductClientNotified = order?.productsByOrder
    ?.map(
      (p) => productsByOrderStore?.find((ps) => ps._id === p)?.isClientNotified
    )
    .some((notified) => !notified);

  const getProductsByOrder = order?.productsByOrder?.map((p) =>
    productsByOrderStore?.find((ps) => ps._id === p)
  );

  const noteContent = productsByOrderInfo?.note;
  const isTagProductExisted =
    productsByOrderInfo?.exchange ||
    productsByOrderInfo?.refund ||
    productsByOrderInfo?.credit;
  return {
    productsByOrderInfo,
    isAnyProductClientNotified,
    getProductsByOrder,
    noteContent,
    isTagProductExisted,
    material,
    articleNumber,
  };
};

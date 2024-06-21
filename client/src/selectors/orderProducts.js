export const getProductsInfo = (
  ordersStore,
  orderProductsStore,
  orderId,
  orderProductsId
) => {
  const order = ordersStore?.find((item) => item._id === orderId);

  const orderProductsInfo = orderProductsStore?.find((ps) => {
    return ps._id === orderProductsId;
  })?.orderProductsActions;
  const articleNumber = orderProductsStore?.find(
    (ps) => ps._id === orderProductsId
  )?.quantity;
  const material = orderProductsStore?.find(
    (ps) => ps._id === orderProductsId
  )?.material;

  const getProductsByOrder = order?.orderProducts?.map((p) =>
    orderProductsStore?.find((ps) => ps._id === p)
  );
  const getOneOrderProducts = getProductsByOrder.find(
    (op) => op?._id === orderProductsId
  );

  const noteContent = orderProductsInfo?.note;
  const isTagProductExisted =
    orderProductsInfo?.exchange ||
    orderProductsInfo?.refund ||
    orderProductsInfo?.credit;
  return {
    orderProductsInfo,
    getProductsByOrder,
    noteContent,
    isTagProductExisted,
    material,
    articleNumber,
    getOneOrderProducts,
  };
};

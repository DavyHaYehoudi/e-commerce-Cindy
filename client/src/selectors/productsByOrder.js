export const getProductsInfo = (
  ordersStore,
  productsByOrderStore,
  orderId,
  productsByOrderId
  ) => {
  const order = ordersStore?.find((item) => item._id === orderId);

  const productsByOrderInfo = productsByOrderStore?.find((ps) => {
    return (
      ps._id === productsByOrderId 
    );
  })?.productsByOrderActions;
  const articleNumber = productsByOrderStore?.find(
    (ps) =>
       ps._id === productsByOrderId  
  )?.quantity;
  const material = productsByOrderStore?.find(
    (ps) =>
       ps._id === productsByOrderId  
  )?.material;

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
    getProductsByOrder,
    noteContent,
    isTagProductExisted,
    material,
    articleNumber,
  };
};

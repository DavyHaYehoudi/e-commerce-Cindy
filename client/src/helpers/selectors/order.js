export const getOrderInfo = (state, orderId) => {
  const order = state.find((item) => item.id === orderId);
  return order;
};

export const getTrackingNumberList = (state, orderId) => {
  const trackingNumberList = state.find(
    (order) => order.id === orderId
  )?.trackingNumber;
  return trackingNumberList;
};

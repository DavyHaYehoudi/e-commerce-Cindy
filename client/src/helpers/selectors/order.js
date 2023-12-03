export const getOrderInfo = (state, orderId) => {
  const order = state.find((item) => item.id === orderId);
  return order;
};

export const getTrackingNumberList = (state, clientId, orderId) => {
    const trackingNumberList = state
      .find((user) => user.id === clientId)
      ?.orders?.find((order) => order.id === orderId)?.trackingNumber;
    return trackingNumberList;
  };
  
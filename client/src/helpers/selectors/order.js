export const getOrderInfo = (state, orderId) => {
  const order = state.find((item) => item.id === orderId);
  return order;
};

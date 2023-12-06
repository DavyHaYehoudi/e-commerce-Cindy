export const getOrderInfo = (state, orderId) => {
  const order = state.find((item) => item.id === orderId);
  return order;
};
// import { createSelector } from "reselect";

// const selectOrdersStore = (state) => state.orders;
// const selectOrderId = (_, orderId) => orderId;

// export const getOrderInfo = createSelector(
//   [selectOrdersStore, selectOrderId],
//   (ordersStore, orderId) => ordersStore.find((item) => item.id === orderId)
// );

export const getTrackingNumberList = (state, orderId) => {
  const trackingNumberList = state.find(
    (order) => order.id === orderId
  )?.trackingNumber;
  return trackingNumberList;
};

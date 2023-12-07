import { createSelector } from "reselect";

const selectOrdersStore = (state) => state.orders;
const selectOrderId = (_, orderId) => orderId;

export const getOrderInfo = createSelector(
  [selectOrdersStore, selectOrderId],
  (ordersStore, orderId) => ordersStore.find((item) => item.id === orderId)
);


export const getTrackingNumberList = createSelector(
  [selectOrdersStore, selectOrderId],
  (ordersStore, orderId) =>
    ordersStore.find((item) => item.id === orderId)?.trackingNumber
);

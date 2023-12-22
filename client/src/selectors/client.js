import { createSelector } from "reselect";

const selectOrdersStore = (state) => state?.orders?.data;
const selectClient = (_, props) => props.client;

export const getClientInfo = createSelector(
  [selectOrdersStore, selectClient],
  (ordersStore, client) => {
    if (!client) {
      return { orders: [], isAnyOrderClientNotified: true };
    }
    const orders = client?.orders?.map((orderId) =>
      ordersStore.find((order) => order.id === orderId)
    );

    const isAnyOrderClientNotified = orders?.some(
      (order) => !ordersStore.find((oa) => oa.id === order.id)?.isClientNotified
    );

    return { orders, isAnyOrderClientNotified };
  }
);

export const getNotesEditorInfo = (state, clientId, notesPropName) => {
  const user = state?.find((user) => user.id === clientId);
  const notes = user?.[notesPropName] || [];

  return { user, notes };
};

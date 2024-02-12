import { createSelector } from "reselect";

const selectOrdersStore = (state) => state?.orders?.data;
const selectIsClientNotified = (state) => state?.orders?.isClientNotified;

const selectClient = (_, props) => props.client;

export const getClientInfo = createSelector(
  [selectOrdersStore, selectClient, selectIsClientNotified],
  (ordersStore, client, isClientNotified) => {
    const orders = client?.orders?.map((orderId) =>
      ordersStore?.find((order) => order._id === orderId)
    );
    const isNotNotified = orders?.some(
      (order) =>
        isClientNotified.find((oa) => oa === order?._id)
    );
    const isStepToProcess = orders?.some(
      (order) => ordersStore?.find((oa) => oa._id === order?._id)?.step === 0
    );
    const isToProcessOrNotNotified = isNotNotified || isStepToProcess;
    return { orders, isToProcessOrNotNotified };
  }
);

export const getNotesEditorInfo = (state, clientId, notesPropName) => {
  const user = state?.find((user) => user._id === clientId);
  const notes = user?.[notesPropName] || [];

  return { user, notes };
};

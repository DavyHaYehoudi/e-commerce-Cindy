import { createSlice } from "@reduxjs/toolkit";
import { ordersMock } from "../../mocks/ordersMock";
import { orderStep } from "../../constants/orderStep";

export const ordersActions = [
  { id: 0, name: orderStep[0].name },
  { id: 1, name: orderStep[1].name },
  { id: 2, name: orderStep[2].name },
  { id: 3, name: orderStep[3].name },
  { id: 4, name: orderStep[4].name },
  { id: 5, name: orderStep[5].name },
  { id: 6, name: orderStep[6].name },
];

const applyOrderAction = (state, action, updateFunction) => {
  return state.map((order) =>
    order.id === action.payload.orderId
      ? updateFunction(order, action.payload)
      : order
  );
};
const updateOrderStep = (order, { step, isClientNotified }) => ({
  ...order,
  step,
  isClientNotified,
});

const updateMoveToNextStep = (
  order,
  { step, isClientNotified, isNextStepOrder }
) => {
  const currentStepIndex = ordersActions.findIndex(
    (s) => s.name === order.step
  );
  const nextStepIndex = (currentStepIndex + 1) % ordersActions.length;
  const nextStep = isNextStepOrder ? ordersActions[nextStepIndex].name : step;

  return {
    ...order,
    step: nextStep,
    isClientNotified,
  };
};
const updateIsClientNotified = (order) => ({
  ...order,
  isClientNotified: false,
});
const updateTotalsInOut = (order, { amount, movement }) => ({
  ...order,
  outTotalAmount:
    movement === "out"
      ? order.outTotalAmount + amount
      : order.outTotalAmount - amount,
});
const trackingNumberAddAdmin = (order, { trackingNumber }) => ({
  ...order,
  trackingNumber: [...order.trackingNumber, trackingNumber],
});

const trackingNumberDelete = (order, { trackingNumberId }) => ({
  ...order,
  trackingNumber: order.trackingNumber.filter(
    (tn) => tn.id !== trackingNumberId
  ),
});

const trackingNumberUpdatedClient = (order, { trackingNumber }) => ({
  ...order,
  trackingNumber: order.trackingNumber.map((tn) =>
    tn.id === trackingNumber.id ? { ...tn, ...trackingNumber } : tn
  ),
});

const ordersSlice = createSlice({
  name: "orderActions",
  initialState: ordersMock,
  reducers: {
    moveToNextStep: (state, action) =>
      applyOrderAction(state, action, updateMoveToNextStep),

    cancelOrder: (state, action) =>
      applyOrderAction(state, action, updateOrderStep),

    reactivateOrder: (state, action) =>
      applyOrderAction(state, action, updateOrderStep),

    sendToClient: (state, action) =>
      applyOrderAction(state, action, (order, payload) => ({
        ...order,
        isClientNotified: payload.isClientNotified,
        lastSentDateToClient: new Date(),
      })),
    articleAction: (state, action) =>
      applyOrderAction(state, action, updateIsClientNotified),

    totalsInOut: (state, action) =>
      applyOrderAction(state, action, updateTotalsInOut),

    addAdminTrackingNumber: (state, action) =>
      applyOrderAction(state, action, trackingNumberAddAdmin),

    deleteTrackingNumber: (state, action) =>
      applyOrderAction(state, action, trackingNumberDelete),

    updatedClientTrackingNumber: (state, action) =>
      applyOrderAction(state, action, trackingNumberUpdatedClient),
  },
});

export const {
  moveToNextStep,
  cancelOrder,
  reactivateOrder,
  sendToClient,
  articleAction,
  totalsInOut,
  addAdminTrackingNumber,
  deleteTrackingNumber,
  updatedClientTrackingNumber,
} = ordersSlice.actions;

export default ordersSlice.reducer;

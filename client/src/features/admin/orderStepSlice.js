import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";
import { orderStep } from "../../constants/orderStep";

export const ordersStep = [
  { id: 0, name: orderStep[0].name },
  { id: 1, name: orderStep[1].name },
  { id: 2, name: orderStep[2].name },
  { id: 3, name: orderStep[3].name },
  { id: 4, name: orderStep[4].name },
  { id: 5, name: orderStep[5].name },
  { id: 6, name: orderStep[6].name },
];

const applyOrderAction = (state, action, updateFunction) => {
  return state.map((user) =>
    user.id === action.payload.clientId
      ? {
          ...user,
          orders: user.orders.map((order) =>
            order.id === action.payload.orderId
              ? updateFunction(order, action.payload)
              : order
          ),
        }
      : user
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
  const currentStepIndex = ordersStep.findIndex((s) => s.name === order.step);
  const nextStepIndex = (currentStepIndex + 1) % ordersStep.length;
  const nextStep = isNextStepOrder ? ordersStep[nextStepIndex].name : step;

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

const orderStepSlice = createSlice({
  name: "orderActions",
  initialState: usersMock,
  reducers: {
    moveToNextStep: (state, action) =>
      applyOrderAction(state, action, updateMoveToNextStep),

    cancelOrder: (state, action) =>
      applyOrderAction(state, action, updateOrderStep),

    reactivateOrder: (state, action) =>
      applyOrderAction(state, action, updateOrderStep),

    trackingNumberAdminChange: (state, action) =>
      applyOrderAction(state, action, (order, payload) => ({
        ...order,
        isClientNotified: payload.isClientNotified,
        trackingNumberAdmin: payload.trackingNumberAdmin,
      })),

    sendToClient: (state, action) =>
      applyOrderAction(state, action, (order, payload) => ({
        ...order,
        isClientNotified: payload.isClientNotified,
        lastSentDateToClient: new Date(),
      })),
    articleAction: (state, action) =>
      applyOrderAction(state, action, updateIsClientNotified),
  },
});

export const {
  moveToNextStep,
  cancelOrder,
  reactivateOrder,
  trackingNumberAdminChange,
  sendToClient,
  articleAction,
} = orderStepSlice.actions;

export default orderStepSlice.reducer;

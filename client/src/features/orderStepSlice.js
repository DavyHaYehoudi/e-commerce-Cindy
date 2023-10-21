import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../mocks/usersMock";
import { orderStep } from "../mocks/orderStep";

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
  const { orderId, isClientNotified, step, isNextStepOrder } = action.payload;
  return state.map((user) => ({
    ...user,
    orders: user.orders.map((order) =>
      order.id === orderId
        ? updateFunction(order, step, isClientNotified, isNextStepOrder)
        : order
    ),
  }));
};

const updateOrderStep = (order, step, isClientNotified) => ({
  ...order,
  step,
  isClientNotified,
});

const updateMoveToNextStep = (
  order,
  step,
  isClientNotified,
  isNextStepOrder
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

    trackingNumberChange: (state, action) =>
      applyOrderAction(state, action, (order, _, isClientNotified) => ({
        ...order,
        isClientNotified,
      })),

    sendToClient: (state, action) =>
      applyOrderAction(state, action, (order, _, isClientNotified) => ({
        ...order,
        isClientNotified,
        lastSentDateToClient:new Date()
      })),
  },
});

export const {
  moveToNextStep,
  cancelOrder,
  reactivateOrder,
  trackingNumberChange,
  sendToClient,
} = orderStepSlice.actions;

export default orderStepSlice.reducer;

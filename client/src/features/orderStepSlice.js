import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../mocks/usersMock";
import { orderStep } from "../mocks/orderStep";

const orderStepMap = {
  [orderStep[0].name]: orderStep[1].name,
  [orderStep[1].name]: orderStep[2].name,
  [orderStep[2].name]: orderStep[0].name,
};

const orderStepSlice = createSlice({
  name: "orderActions",
  initialState: usersMock,
  reducers: {
    moveToNextStep: (state, action) => {
      const {
        orderId,
        isNextStepOrder,
        isNewOrder,
        isInProcessingOrder,
        isClientNotified,
        isProcessed,
        step,
      } = action.payload;

      return state.map((user) => {
        return {
          ...user,
          orders: user.orders.map((order) => {
            if (order.id === orderId) {
              const currentStep = order.step;
              const nextStep = orderStepMap[currentStep] || orderStep[0].name;

              return {
                ...order,
                step: isNextStepOrder ? nextStep : step,
                isNextStepOrder,
                isNewOrder,
                isProcessed,
                isInProcessingOrder,
                isClientNotified,
              };
            }
            return order;
          }),
        };
      });
    },
    cancelOrder: (state, action) => {
      const {
        orderId,
        isNewOrder,
        isInProcessingOrder,
        isClientNotified,
        isProcessed,
        step,
      } = action.payload;
      return state.map((user) => {
        return {
          ...user,
          orders: user.orders.map((order) => {
            if (order.id === orderId) {
              return {
                ...order,
                step,
                isNewOrder,
                isProcessed,
                isInProcessingOrder,
                isClientNotified,
              };
            }
            return order;
          }),
        };
      });
    },
    sendToClient: (state, action) => {
      // Logique pour envoyer la fiche au client
    },
  },
});

export const { moveToNextStep, cancelOrder, sendToClient } =
  orderStepSlice.actions;

export default orderStepSlice.reducer;

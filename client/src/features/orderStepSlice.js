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



const orderStepSlice = createSlice({
  name: "orderActions",
  initialState: usersMock,
  reducers: {
    moveToNextStep: (state, action) => {
      const {
        orderId,
        isNextStepOrder,
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
              const currentStepIndex = ordersStep.findIndex(
                (s) => s.name === order.step
              );
              const nextStepIndex = (currentStepIndex + 1) % ordersStep.length;
              const nextStep = ordersStep[nextStepIndex].name;

              return {
                ...order,
                step: isNextStepOrder ? nextStep : step,
                isNextStepOrder,
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
    reactivateOrder:(state,action)=>{
      const {
        orderId,
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

export const { moveToNextStep, cancelOrder,reactivateOrder, sendToClient } =
  orderStepSlice.actions;

export default orderStepSlice.reducer;

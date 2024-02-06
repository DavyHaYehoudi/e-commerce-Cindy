import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";

const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    return customFetch("order");
  } catch (error) {
    handleFetchError(error);
  }
});
const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({
    orderId,
    actionType,
    step,
    isClientNotified,
    isNextStepOrder,
    movement,
    amount,
    trackingNumber,
  }) => {
    try {
      await customFetch(`order/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({
          actionType,
          step,
          isClientNotified,
          isNextStepOrder,
          movement,
          amount,
          trackingNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return {
        orderId,
        actionType,
        step,
        isClientNotified,
        isNextStepOrder,
        movement,
        amount,
        trackingNumber,
      };
    } catch (error) {
      handleFetchError(error);
    }
  }
);

export const ordersActions = [
  { id: 0, number: 0 },
  { id: 1, number: 1 },
  { id: 2, number: 2 },
  { id: 3, number: 3 },
  { id: 4, number: 4 },
  { id: 5, number: 5 },
  { id: 6, number: 6 },
];
const applyOrderAction = (state, action, updateFunction) => {
  state.data = state.data.map((order) =>
    order._id === action.payload.orderId
      ? updateFunction(order, action.payload)
      : order
  );
};
const updateOrderStep = (order, { step, isClientNotified }) => ({
  ...order,
  step,
  isClientNotified,
});
const sendToTheClient = (order, payload) => ({
  ...order,
  isClientNotified: payload.isClientNotified,
  lastSentDateToClient: new Date().toISOString(),
});
const updateMoveToNextStep = (
  order,
  { step, isClientNotified, isNextStepOrder }
) => {
  const currentStepIndex = ordersActions.findIndex(
    (s) => s.number === order.step
  );

  const nextStepIndex = (currentStepIndex + 1) % ordersActions.length;
  const nextStep = isNextStepOrder ? ordersActions[nextStepIndex].number : step;

  return {
    ...order,
    step: nextStep,
    isClientNotified,
  };
};
const updateTotalsInOut = (order, { amount, movement }) => ({
  ...order,
  isClientNotified: false,
  outTotalAmount:
    movement === "out"
      ? order.outTotalAmount + amount
      : order.outTotalAmount - amount,
});
const trackingNumberAddAdmin = (order, { trackingNumber }) => ({
  ...order,
  trackingNumber: [...order.trackingNumber, trackingNumber],
});
const trackingNumberDelete = (order, { trackingNumber }) => ({
  ...order,
  trackingNumber: order.trackingNumber.filter(
    (tn) => tn._id !== trackingNumber._id
  ),
});
const trackingNumberUpdatedClient = (order, { trackingNumber }) => ({
  ...order,
  trackingNumber: order.trackingNumber.map((tn) =>
    tn._id === trackingNumber._id ? { ...tn, ...trackingNumber } : tn
  ),
});

const ordersSlice = createSlice({
  name: "orderActions",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const { actionType } = action.meta.arg;
        switch (actionType) {
          case "moveToNextStep":
            applyOrderAction(state, action, updateMoveToNextStep);
            break;
          case "cancelOrder":
            applyOrderAction(state, action, updateOrderStep);
            break;
          case "reactivateOrder":
            applyOrderAction(state, action, updateOrderStep);
            break;
          case "sendToClient":
            applyOrderAction(state, action, sendToTheClient);
            break;
          case "totalsInOut":
            applyOrderAction(state, action, updateTotalsInOut);
            break;
          case "trackingNumberAddAdmin":
            applyOrderAction(state, action, trackingNumberAddAdmin);
            break;
          case "trackingNumberDelete":
            applyOrderAction(state, action, trackingNumberDelete);
            break;
          case "trackingNumberUpdatedClient":
            applyOrderAction(state, action, trackingNumberUpdatedClient);
            break;
          default:
            console.log("Une erreur dans le choix du switch dans ordersSlice");
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchOrders, updateOrder };
export default ordersSlice.reducer;

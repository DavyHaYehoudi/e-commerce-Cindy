import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";
// import { ordersMock } from "../../mocks/ordersMock";

const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    return customFetch("order");
  } catch (error) {
    handleFetchError(error);
  }
});
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
  state.data= state.data.map((order) =>
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
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    moveToNextStep: (state, action) =>
      applyOrderAction(state, action, updateMoveToNextStep),

    cancelOrder: (state, action) =>
      applyOrderAction(state, action, updateOrderStep),

    reactivateOrder: (state, action) =>
      applyOrderAction(state, action, updateOrderStep),

    sendToClient: (state, action) =>
      applyOrderAction(state, action, sendToTheClient),

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
      });
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
export { fetchOrders };
export default ordersSlice.reducer;

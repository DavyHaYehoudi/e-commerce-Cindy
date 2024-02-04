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
  async ({ orderId, actionType, step, isClientNotified, isNextStepOrder }) => {
    try {
      const response = await customFetch(`order/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({
          actionType,
          step,
          isClientNotified,
          isNextStepOrder,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      handleFetchError(error);
    }
  }
);

const applyOrderAction = (state, action, updateFunction) => {
  state.data = state.data.map((order) =>
    order._id === action.payload.orderId
      ? updateFunction(order, action.payload)
      : order
  );
};
// const updateOrderStep = (order, { step, isClientNotified }) => ({
//   ...order,
//   step,
//   isClientNotified,
// });

const sendToTheClient = (order, payload) => ({
  ...order,
  isClientNotified: payload.isClientNotified,
  lastSentDateToClient: new Date().toISOString(),
});

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
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = state.data.map((order) =>
          order._id === action.payload.updatedOrder._id
            ? action.payload.updatedOrder
            : order
        );
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  sendToClient,
  articleAction,
  totalsInOut,
  addAdminTrackingNumber,
  deleteTrackingNumber,
  updatedClientTrackingNumber,
} = ordersSlice.actions;
export { fetchOrders, updateOrder };
export default ordersSlice.reducer;

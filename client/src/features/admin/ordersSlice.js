import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsByOrder } from "./orderProductsSlice";
import { fetchCredits } from "./creditSlice";
import { Get } from "../../services/httpMethods";

const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ orderIds }, { dispatch }) => {
    try {
      const orders = await Get(`orders?orderIds=${orderIds}`);
      const orderProductsIds = orders
        .map((order) => order.orderProducts)
        .flat();
      dispatch(
        fetchProductsByOrder({
          orderProductsIds: JSON.stringify(orderProductsIds),
        })
      );
      dispatch(
        fetchCredits({ orderProductsIds: JSON.stringify(orderProductsIds) })
      );
      return orders;
    } catch (error) {
      console.error("Erreur dans fetchOrders (ordersSlice) :", error);
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
  const { orderId } = action.payload;

  state.data = state.data.map((order) =>
    order._id === orderId ? updateFunction(order, action.payload) : order
  );

  if (action.type === sendToClientSuccess.type) {
    state.isClientNotified = state.isClientNotified.filter(
      (item) => item !== orderId
    );
  } else {
    if (!state.isClientNotified.some((item) => item === orderId)) {
      state.isClientNotified.push(orderId);
    }
  }
};

const updateOrderStep = (order, { step }) => ({
  ...order,
  step,
});

const sendToTheClientSuccess = (order, payload) => ({
  ...order,
  lastSentDateToClient: payload.lastSentDateToClient,
});

const updateMoveToNextStep = (order, { step, isNextStepOrder }) => {
  const currentStepIndex = ordersActions.findIndex(
    (s) => s.number === order.step
  );

  const nextStepIndex = (currentStepIndex + 1) % ordersActions.length;
  const nextStep = isNextStepOrder ? ordersActions[nextStepIndex].number : step;

  return {
    ...order,
    step: nextStep,
  };
};

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
  initialState: { data: [], isClientNotified: [], status: "idle", error: null },
  reducers: {
    moveToNextStep: (state, action) =>
      applyOrderAction(state, action, updateMoveToNextStep),

    cancelOrder: (state, action) =>
      applyOrderAction(state, action, updateOrderStep),

    reactivateOrder: (state, action) =>
      applyOrderAction(state, action, updateOrderStep),

    sendToClientSuccess: (state, action) =>
      applyOrderAction(state, action, sendToTheClientSuccess),

    totalsInOut: (state, action) =>
      applyOrderAction(state, action, updateTotalsInOut),

    addAdminTrackingNumber: (state, action) =>
      applyOrderAction(state, action, trackingNumberAddAdmin),

    deleteTrackingNumber: (state, action) =>
      applyOrderAction(state, action, trackingNumberDelete),

    updatedClientTrackingNumber: (state, action) =>
      applyOrderAction(state, action, trackingNumberUpdatedClient),

    isClientNotified: (state, action) => {
      const { orderId } = action.payload;
      if (!state.isClientNotified.some((item) => item === orderId)) {
        state.isClientNotified.push(orderId);
      }
    },
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
  sendToClientSuccess,
  totalsInOut,
  addAdminTrackingNumber,
  deleteTrackingNumber,
  updatedClientTrackingNumber,
  isClientNotified,
} = ordersSlice.actions;
export { fetchOrders };
export default ordersSlice.reducer;

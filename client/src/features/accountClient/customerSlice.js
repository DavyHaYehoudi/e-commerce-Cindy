import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";

const fetchCustomer = createAsyncThunk(
  "client/fetchCustomer",
  async (clientId) => {
    try {
      return customFetch(`client/${clientId}`);
    } catch (error) {
      handleFetchError(error);
    }
  }
);
const customer = createSlice({
  name: "customer",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    deleteTrackingNumber: (state, action) => {
      state.data.orders = state?.data?.orders?.map((order) =>
        order._id === action.payload.orderId
          ? {
              ...order,
              trackingNumber: order.trackingNumber.filter(
                (tn) => tn.id !== action.payload.trackingNumberId
              ),
            }
          : order
      );
    },
    addClientTrackingNumber: (state, action) => {
      state.data.orders = state?.data?.orders?.map((order) =>
        order._id === action.payload.orderId
          ? {
              ...order,
              trackingNumber: [
                ...order.trackingNumber,
                action.payload.trackingNumber,
              ],
            }
          : order
      );
    },
    updateClientField: (state, action) => {
      const { clientId, field, value } = action.payload;
      const client = state?.data?.client;

      if (clientId === client._id) {
        client[field] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  deleteTrackingNumber,
  addClientTrackingNumber,
  updateClientField,
} = customer.actions;
export { fetchCustomer };
export default customer.reducer;

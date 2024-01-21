import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";

const fetchClient = createAsyncThunk("client/fetchClient", async (clientId) => {
  try {
    return customFetch(`clients/${clientId}`);
  } catch (error) {
    handleFetchError(error);
  }
});
const clientSlice = createSlice({
  name: "client",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    deleteTrackingNumber: (state, action) => {
      state.data.orders = state?.data?.orders?.map((order) =>
        order.id === action.payload.orderId
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
        order.id === action.payload.orderId
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { deleteTrackingNumber,addClientTrackingNumber } = clientSlice.actions;
export { fetchClient };
export default clientSlice.reducer;

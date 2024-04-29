import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";
import { toast } from "react-toastify";

const fetchCustomer = createAsyncThunk(
  "client/fetchCustomer",
  async (clientId) => {
    try {
      return customFetch(`clients/${clientId}`);
    } catch (error) {
      handleFetchError(error);
    }
  }
);
const addClientTrackingNumber = createAsyncThunk(
  "orders/addClientTrackingNumber",
  async ({ orderId, trackingNumber }) => {
    try {
      await customFetch(`orders/${orderId}/trackingnumber_client`, {
        method: "POST",
        body: JSON.stringify({
          trackingNumber,
        }),
      });
      return { orderId, trackingNumber };
    } catch (error) {
      handleFetchError(error);
      throw error;
    }
  }
);
const deleteTrackingNumber = createAsyncThunk(
  "orders/deleteClientTrackingNumber",
  async ({ orderId, trackingNumberId }) => {
    try {
      await customFetch(
        `orders/${orderId}/trackingnumber_client/${trackingNumberId}`,
        {
          method: "DELETE",
        }
      );
      return { orderId, trackingNumberId };
    } catch (error) {
      handleFetchError(error);
      throw error;
    }
  }
);

const customer = createSlice({
  name: "customer",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    updateClientField: (state, action) => {
      const { fieldName, nestedFieldName, value } = action.payload;
      if (nestedFieldName) {
        state.data.client = {
          ...state.data.client,
          [nestedFieldName]: {
            ...state.data.client[nestedFieldName],
            [fieldName]: value,
          },
        };
      } else {
        state.data.client = { ...state.data.client, [fieldName]: value };
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
      })
      .addCase(addClientTrackingNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addClientTrackingNumber.fulfilled, (state, action) => {
        toast.success("Le numéro de suivi a bien été enregistré 😀");
        state.status = "succeeded";
        state.error = null;
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
      })
      .addCase(addClientTrackingNumber.rejected, (state, action) => {
        toast.error("Une erreur est survenue avec les informations fournies.");
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTrackingNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTrackingNumber.fulfilled, (state, action) => {
        toast.success("Le numéro de suivi a bien été supprimé 😀");
        state.status = "succeeded";
        state.error = null;
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
      })
      .addCase(deleteTrackingNumber.rejected, (state, action) => {
        toast.error("Une erreur est survenue avec les informations fournies.");
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { updateClientField } = customer.actions;
export { fetchCustomer, addClientTrackingNumber, deleteTrackingNumber };
export default customer.reducer;

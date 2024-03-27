import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as actions from "../../constants/orderProductsActions";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";
import { toast } from "react-toastify";

const fetchProductsByOrder = createAsyncThunk(
  "orderProducts/fetchProductsByOrder",
  async ({ orderProductsIds }) => {
    try {
      return customFetch(`orderProducts?orderProductsIds=${orderProductsIds}`);
    } catch (error) {
      handleFetchError(error);
    }
  }
);
const orderProductsNote = createAsyncThunk(
  "orderProducts/note",
  async ({ orderProductsId, content }) => {
    try {
      await customFetch(`orderProducts/${orderProductsId}/note`, {
        method: "PATCH",
        body: JSON.stringify({ content }),
      });
      return { orderProductsId, content };
    } catch (error) {
      handleFetchError(error);
      throw error;
    }
  }
);
const orderProductsSlice = createSlice({
  name: "orderProducts",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    updateActionContent: (state, action) => {
      const {
        creditContent,
        orderProductsId,
        updatedProperty,
        productActionContent,
      } = action.payload;

      const timestamp = new Date().toISOString();

      state.data = state?.data.map((orderProducts) => {
        if (orderProductsId === orderProducts._id) {
          let updatedActions = { ...orderProducts.orderProductsActions };

          if (updatedProperty === actions.CREDIT) {
            updatedActions = {
              ...updatedActions,
              [updatedProperty]: creditContent,
            };
          } else {
            updatedActions = {
              ...updatedActions,
              [updatedProperty]: productActionContent,
            };

            // Mise à jour de la propriété de date correspondante
            if (updatedProperty === actions.REFUND) {
              updatedActions.refundDate = timestamp;
            } else if (updatedProperty === actions.EXCHANGE) {
              updatedActions.exchangeDate = timestamp;
            }
          }

          return {
            ...orderProducts,
            orderProductsActions: updatedActions,
          };
        }
        return orderProducts;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchProductsByOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(orderProductsNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orderProductsNote.fulfilled, (state, action) => {
        toast.success("La note a bien été enregistrée !");
        state.status = "succeeded";
        state.error = null;
        const { orderProductsId, content } = action.payload;
        state.data = state.data.map((item) => {
          if (item._id === orderProductsId) {
            return {
              ...item,
              note: content,
            };
          }
          return item;
        });
      })
      .addCase(orderProductsNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue avec les informations fournies.");
      });
  },
});
export const { updateActionContent } = orderProductsSlice.actions;
export { fetchProductsByOrder, orderProductsNote };
export default orderProductsSlice.reducer;

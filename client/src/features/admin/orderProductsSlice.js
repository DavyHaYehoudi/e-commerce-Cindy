import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as actions from "../../constants/orderProductsActions";
import { toast } from "react-toastify";
import { Get, Patch } from "../../services/httpMethods";

const fetchProductsByOrder = createAsyncThunk(
  "orderProducts/fetchProductsByOrder",
  async ({ orderProductsIds }) => {
    return Get(`orderProducts?orderProductsIds=${orderProductsIds}`);
  }
);
const orderProductsNote = createAsyncThunk(
  "orderProducts/note",
  async ({ orderProductsId, content, handleUnauthorized }) => {
    await Patch(
      `orderProducts/${orderProductsId}/note`,
      { content },
      null,
      handleUnauthorized
    );
    return { orderProductsId, content };
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
      });
  },
});
export const { updateActionContent } = orderProductsSlice.actions;
export { fetchProductsByOrder, orderProductsNote };
export default orderProductsSlice.reducer;

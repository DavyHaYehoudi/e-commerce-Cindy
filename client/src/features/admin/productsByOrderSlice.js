import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as actions from "../../constants/productsByOrderActions";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";
import { toast } from "react-toastify";

const fetchProducts = createAsyncThunk(
  "productsByOrder/fetchProducts",
  async () => {
    try {
      return customFetch("productsByOrder");
    } catch (error) {
      handleFetchError(error);
    }
  }
);
const productsByOrderNote = createAsyncThunk(
  "productsByOrder/note",
  async ({ productsByOrderId, content }) => {
    try {
      await customFetch(`productsbyorder/note/${productsByOrderId}`, {
        method: "PATCH",
        body: JSON.stringify({ content }),
      });
      return { productsByOrderId, content };
    } catch (error) {
      handleFetchError(error);
      throw error;
    }
  }
);
const productsByOrderSlice = createSlice({
  name: "productsByOrder",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    updateActionContent: (state, action) => {
      const {
        creditContent,
        productsByOrderId,
        updatedProperty,
        productActionContent,
      } = action.payload;

      state.data = state?.data.map((productsByOrder) => {
        if (productsByOrderId === productsByOrder._id) {
          if (updatedProperty === actions.CREDIT) {
            return {
              ...productsByOrder,
              productsByOrderActions: {
                ...productsByOrder.productsByOrderActions,
                [updatedProperty]: creditContent,
              },
            };
          }
          return {
            ...productsByOrder,
            productsByOrderActions: {
              ...productsByOrder.productsByOrderActions,
              [updatedProperty]: productActionContent,
            },
          };
        }
        return productsByOrder;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(productsByOrderNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productsByOrderNote.fulfilled, (state, action) => {
        toast.success("La note a bien été enregistrée !");
        state.status = "succeeded";
        state.error = null;
        const { productsByOrderId, content } = action.payload;
        state.data = state.data.map((item) => {
          if (item._id === productsByOrderId) {
            return {
              ...item,
              note: content,
            };
          }
          return item;
        });
      })
      .addCase(productsByOrderNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(
          "Une erreur est survenue avec les informations fournies."
        );
      });
  },
});
export const { updateActionContent } = productsByOrderSlice.actions;
export { fetchProducts, productsByOrderNote };
export default productsByOrderSlice.reducer;

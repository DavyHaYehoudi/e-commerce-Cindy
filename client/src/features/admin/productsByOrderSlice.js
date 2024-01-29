import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { productsByOrderMock } from "../../mocks/productsByOrderMock";
import * as actions from "../../constants/productsByOrderActions";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";

const fetchProducts = createAsyncThunk("productsByOrder/fetchProducts", async () => {
  try {
    return customFetch("productsByOrder");
  } catch (error) {
    handleFetchError(error);
  }
});
const productsByOrderSlice = createSlice({
  name: "productsByOrder",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    updateActionContent: (state, action) => {
      const {
        creditContent,
        productId,
        updatedProperty,
        isClientNotified,
        productActionContent,
      } = action.payload;

      state.data = state?.data.map((product) => {
        if (product.productId === productId) {
          if (updatedProperty === actions.CREDIT) {
            return {
              ...product,
              isClientNotified,
              productsByOrderActions: {
                ...product.productsByOrderActions,
                [updatedProperty]: creditContent,
              },
            };
          }
          return {
            ...product,
            isClientNotified,
            productsByOrderActions: {
              ...product.productsByOrderActions,
              [updatedProperty]: productActionContent,
            },
          };
        }
        return product;
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
      });
  },
});
export const { updateActionContent } = productsByOrderSlice.actions;
export { fetchProducts };
export default productsByOrderSlice.reducer;

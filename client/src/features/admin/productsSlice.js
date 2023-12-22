import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { productsMock } from "../../mocks/productsMock";
import * as actions from "../../constants/productsActions";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";

const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    return customFetch("products");
  } catch (error) {
    handleFetchError(error);
  }
});
const productsSlice = createSlice({
  name: "products",
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
              productsActions: {
                ...product.productsActions,
                [updatedProperty]: creditContent,
              },
            };
          }
          return {
            ...product,
            isClientNotified,
            productsActions: {
              ...product.productsActions,
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
export const { updateActionContent } = productsSlice.actions;
export { fetchProducts };
export default productsSlice.reducer;

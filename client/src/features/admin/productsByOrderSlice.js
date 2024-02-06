import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as actions from "../../constants/productsByOrderActions";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";

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
const updateActionContent = createAsyncThunk(
  "productsByOrder/updateActionContent",
  async ({
    creditContent,
    updatedProperty,
    isClientNotified,
    productActionContent,
    productsByOrderId,
  }) => {
    try {
      await customFetch(`productsByOrder/${productsByOrderId}`, {
        method: "PATCH",
        body: JSON.stringify({
          creditContent,
          updatedProperty,
          isClientNotified,
          productActionContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return {
        creditContent,
        updatedProperty,
        isClientNotified,
        productActionContent,
        productsByOrderId,
      };
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
    productsByOrderNotes: (state, action) => {
      const {
        content,
        productsByOrderId,
      } = action.payload;

      state.data = state?.data.map((product) => {
        if (productsByOrderId === product._id) {
          return {
            ...product,
            productsByOrderActions: {
              ...product.productsByOrderActions,
              note: content,
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
      })
      .addCase(updateActionContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateActionContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = state?.data.map((product) => {
          const {
            creditContent,
            updatedProperty,
            isClientNotified,
            productActionContent,
            productsByOrderId,
          } = action.payload;

          if (productsByOrderId === product._id) {
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
      })
      .addCase(updateActionContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchProducts, updateActionContent };
export const{productsByOrderNotes}=productsByOrderSlice.actions
export default productsByOrderSlice.reducer;

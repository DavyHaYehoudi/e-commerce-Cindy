import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";

const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try {
      return customFetch("categories");
    } catch (error) {
      handleFetchError(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "category",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    addCategory: (state, action) => {
      //   const { orderProductsId, amount, dateExpire } = action.payload;
      //   state.data = [...state.data, { orderProductsId, amount, dateExpire }];
    },
    updateCategory: (state, action) => {
      //   const { orderProductsId, amount, dateExpire } = action.payload;
      //   state.data = [...state.data, { orderProductsId, amount, dateExpire }];
    },
    deleteCategory: (state, action) => {
      //   const { orderProductsId } = action.payload;
      //   state.data = state.data.filter(
      //     (item) => item.orderProductsId !== orderProductsId
      //   );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchCategories };
export const { addCategory, deleteCategory, updateCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;

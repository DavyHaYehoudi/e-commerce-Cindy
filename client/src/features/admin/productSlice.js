import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";

const fetchProduct = createAsyncThunk("product/fetchProduct", async () => {
  try {
    return customFetch("products");
  } catch (error) {
    handleFetchError(error);
  }
});
const productSlice = createSlice({
  name: "product",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchProduct };
export default productSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Get } from "../../services/httpMethods";

const fetchProductsFixed = createAsyncThunk(
  "product/fetchProductsFixed",
  async (query = {}) => {
    const queryString = new URLSearchParams(query).toString();
    return Get(`products?${queryString}`);
  }
);

const productsFixedSlice = createSlice({
  name: "productsFixed",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsFixed.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsFixed.fulfilled, (state, action) => {
        const { products } = action.payload || {};
        state.status = "succeeded";
        state.error = null;
        state.data = products;
      })
      .addCase(fetchProductsFixed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});
export { fetchProductsFixed };
export default productsFixedSlice.reducer;

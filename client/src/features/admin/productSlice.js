import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";

const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (name = "") => {
    let queryString = "";
    if (name !== "") {
      queryString = new URLSearchParams({ name }).toString();
    }
    try {
      return customFetch(`products?${queryString}`);
      // return customFetch("products");
    } catch (error) {
      handleFetchError(error);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    totalProductsCount: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const { products, totalProductsCount } = action.payload;
        state.status = "succeeded";
        state.error = null;
        state.data = products;
        state.totalProductsCount = totalProductsCount;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchProduct };
export default productSlice.reducer;

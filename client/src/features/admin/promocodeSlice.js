import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Del, Get, Post } from "../../services/httpMethods";
import { toast } from "react-toastify";

const fetchPromocode = createAsyncThunk(
  "promocode/fetchPromocode",
  async ({ handleUnauthorized }) => {
    return Get("promocodes", null, handleUnauthorized);
  }
);
const createPromocode = createAsyncThunk(
  "promocode/createPromocode",
  async ({ formatData, handleUnauthorized }) => {
    return Post("promocodes",  formatData , null, handleUnauthorized);
  }
);
const deletePromocode = createAsyncThunk(
  "promocodes/deletePromocode",
  async ({ promocodeId, handleUnauthorized }) => {
    return await Del(`promocodes/${promocodeId}`, null, handleUnauthorized);
  }
);

const promocodeSlice = createSlice({
  name: "promocode",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromocode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPromocode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchPromocode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPromocode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPromocode.fulfilled, (state, action) => {
        toast.success("Le code promo a bien été enregistré 😀");
        state.status = "succeeded";
        state.error = null;
        state.data = [...state.data, action.payload];
      })
      .addCase(createPromocode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePromocode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePromocode.fulfilled, (state, action) => {
        toast.success("Le code promo a bien été supprimé 😀");
        state.status = "succeeded";
        state.error = null;
        const promocodeId = action.payload;
        state.data = state.data.filter((item) => item._id !== promocodeId);
      })
      .addCase(deletePromocode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchPromocode, createPromocode, deletePromocode };
export default promocodeSlice.reducer;

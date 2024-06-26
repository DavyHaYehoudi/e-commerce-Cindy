import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Get } from "../../services/httpMethods";
const fetchCredits = createAsyncThunk(
  "credit/fetchCredits",
  async ({ orderProductsIds }) => {
    return Get(`credits?orderProductsIds=${orderProductsIds}`);
  }
);

const creditSlice = createSlice({
  name: "credit",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    addCredit: (state, action) => {
      const { orderProductsId, amount, dateExpire, clientId } = action.payload;
      state.data = [
        ...state.data,
        { orderProductsId, amount, dateExpire, clientId },
      ];
    },
    deleteCredit: (state, action) => {
      const { orderProductsId } = action.payload;
      state.data = state.data.filter(
        (item) => item.orderProductsId !== orderProductsId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCredits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCredits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchCredits };
export const { addCredit, deleteCredit } = creditSlice.actions;
export default creditSlice.reducer;

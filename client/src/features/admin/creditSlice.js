import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";

const fetchCredits = createAsyncThunk("credit/fetchCredits", async () => {
  try {
    return customFetch("credit");
  } catch (error) {
    handleFetchError(error);
  }
});

const creditSlice = createSlice({
  name: "credit",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    addCredit: (state, action) => {
      const { productsByOrderId, amount, dateExpire } = action.payload;
      state.data = [...state.data, { productsByOrderId, amount, dateExpire }];
    },
    deleteCredit: (state, action) => {
      const { productsByOrderId } = action.payload;
      state.data = state.data.filter((item) => item.productsByOrderId !== productsByOrderId);
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
      })
  },
});
export { fetchCredits };
export const { addCredit, deleteCredit } = creditSlice.actions;
export default creditSlice.reducer;

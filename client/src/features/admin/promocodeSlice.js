import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";

const fetchPromocode = createAsyncThunk("promocode/fetchPromocode", async () => {
  try {
    return customFetch("promocodes");
  } catch (error) {
    handleFetchError(error);
  }
});
const promocodeSlice = createSlice({
  name: "promocode",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    
  },
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
      });
  },
});
export { fetchPromocode };
export default promocodeSlice.reducer;

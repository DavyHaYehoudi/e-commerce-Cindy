import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { Get } from "../../services/httpMethods";
import { handleFetchError } from "../../services/errors/handleFetchError";

const fetchPromocode = createAsyncThunk(
  "promocode/fetchPromocode",
  async ({handleUnauthorized}) => {
    try {
      return Get("promocodes",null,handleUnauthorized);
    } catch (error) {
      handleFetchError(error);
    }
  }
);
const createPromocode = createAsyncThunk(
  "promocode/createPromocode",
  async (promocodeData) => {
    try {
      return customFetch("promocodes", {
        method: "POST",
        body: JSON.stringify(promocodeData),
      });
    } catch (error) {
      handleFetchError(error);
    }
  }
);
const deletePromocode = createAsyncThunk(
  "promocodes/deletePromocode",
  async (promocodeId) => {
    try {
      const response = await customFetch(`promocodes/${promocodeId}`, {
        method: "DELETE",
      });
      return response;
    } catch (error) {
      handleFetchError(error);
    }
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

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
const addCredit = createAsyncThunk("credit/addCredit", async (creditData) => {
  try {
    const response = await customFetch("credit", {
      method: "POST",
      body: JSON.stringify(creditData),
    });
    return response;
  } catch (error) {
    handleFetchError(error);
  }
});
const deleteCredit = createAsyncThunk("credit/deleteCredit", async (productsByOrderId) => {
  try {
    await customFetch(`credit/${productsByOrderId}`, {
      method: "DELETE",
    });
    return productsByOrderId;
  } catch (error) {
    handleFetchError(error);
    throw error; 
  }
});
const creditSlice = createSlice({
  name: "credit",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    // deleteCredit: (state, action) => {
    //   const { productsByOrderId } = action.payload;
    //   state.data = state.data.filter(
    //     (item) => item.productsByOrderId !== productsByOrderId
    //   );
    // },
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
      .addCase(addCredit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCredit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = [...state.data, action.payload];
      })
      .addCase(addCredit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCredit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCredit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = state.data.filter((credit) => credit.productsByOrderId !== action.payload);
      })
      .addCase(deleteCredit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchCredits, addCredit,deleteCredit };
export default creditSlice.reducer;

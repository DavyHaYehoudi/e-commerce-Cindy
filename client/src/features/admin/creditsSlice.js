import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { creditsMock } from "../../mocks/creditsMock";
import { generateRandomCode } from "../../helpers/utils/creditCode";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";

const fetchCredits = createAsyncThunk("credits/fetchCredits", async () => {
  try {
    return customFetch("credits");
  } catch (error) {
    handleFetchError(error);
  }
});
const creditsSlice = createSlice({
  name: "credits",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    addCredit: (state, action) => {
      const { productsId, amount, dateExpire } = action.payload;
      const id = generateRandomCode(); //A faire en Back
      state.data = [...state.data, { id, productsId, amount, dateExpire }];
    },
    deleteCredit: (state, action) => {
      const { productsId } = action.payload;
      state.data = state.data.filter((item) => item.productsId !== productsId);
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
export const { addCredit, deleteCredit } = creditsSlice.actions;
export { fetchCredits };
export default creditsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";

const fetchTags = createAsyncThunk("tag/fetchTags", async () => {
  try {
    return customFetch("tags");
  } catch (error) {
    handleFetchError(error);
  }
});

const tagSlice = createSlice({
  name: "tag",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    addTag: (state, action) => {
      //   const { orderProductsId, amount, dateExpire } = action.payload;
      //   state.data = [...state.data, { orderProductsId, amount, dateExpire }];
    },
    updateTag: (state, action) => {
      //   const { orderProductsId, amount, dateExpire } = action.payload;
      //   state.data = [...state.data, { orderProductsId, amount, dateExpire }];
    },
    deleteTag: (state, action) => {
      //   const { orderProductsId } = action.payload;
      //   state.data = state.data.filter(
      //     (item) => item.orderProductsId !== orderProductsId
      //   );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchTags };
export const { addTag, deleteTag, updateTag } = tagSlice.actions;
export default tagSlice.reducer;

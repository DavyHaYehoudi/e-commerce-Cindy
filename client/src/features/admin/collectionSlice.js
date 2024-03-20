import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";

const fetchCollections = createAsyncThunk(
  "collection/fetchCollections",
  async () => {
    try {
      return customFetch("collections");
    } catch (error) {
      handleFetchError(error);
    }
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    addCollection: (state, action) => {
      //   const { orderProductsId, amount, dateExpire } = action.payload;
      //   state.data = [...state.data, { orderProductsId, amount, dateExpire }];
    },
    updateCollection: (state, action) => {
      //   const { orderProductsId, amount, dateExpire } = action.payload;
      //   state.data = [...state.data, { orderProductsId, amount, dateExpire }];
    },
    deleteCollection: (state, action) => {
      //   const { orderProductsId } = action.payload;
      //   state.data = state.data.filter(
      //     (item) => item.orderProductsId !== orderProductsId
      //   );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchCollections };
export const { addCollection, deleteCollection, updateCollection } =
  collectionSlice.actions;
export default collectionSlice.reducer;

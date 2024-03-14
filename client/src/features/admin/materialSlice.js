import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";

const fetchMaterials = createAsyncThunk(
  "material/fetchMaterials",
  async () => {
    try {
      return customFetch("materials");
    } catch (error) {
      handleFetchError(error);
    }
  }
);

const materialSlice = createSlice({
  name: "material",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    addMaterial: (state, action) => {
    //   const { orderProductsId, amount, dateExpire } = action.payload;
    //   state.data = [...state.data, { orderProductsId, amount, dateExpire }];
    },
    deleteMaterial: (state, action) => {
    //   const { orderProductsId } = action.payload;
    //   state.data = state.data.filter(
    //     (item) => item.orderProductsId !== orderProductsId
    //   );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchMaterials };
export const { addMaterial, deleteMaterial } = materialSlice.actions;
export default materialSlice.reducer;

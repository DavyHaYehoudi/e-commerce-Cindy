import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Del, Get, Post, Put } from "../../services/httpMethods";

const fetchTags = createAsyncThunk("tag/fetchTags", async () => {
  return Get("tags");
});
const addTag = createAsyncThunk(
  "tag/adTag",
  async ({ formatData, handleUnauthorized }) => {
    return await Post("tags", formatData, null, handleUnauthorized);
  }
);

const updateTag = createAsyncThunk(
  "tag/updateTag",
  async ({ tagId, name, handleUnauthorized }) => {
    return await Put(`tags/${tagId}`, { name }, null, handleUnauthorized);
  }
);
const deleteTag = createAsyncThunk(
  "tag/deleteTag",
  async ({ tagId, handleUnauthorized }) => {
    await Del(`tags/${tagId}`, null, handleUnauthorized);
    return tagId;
  }
);

const tagSlice = createSlice({
  name: "tag",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
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
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.data = state.data.concat(action.payload);
        toast.success("Le tag a bien été enregistré 😀");
      })
      .addCase(addTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        toast.success("Le tag a bien été modifié 😀");
        state.data = state.data.map((tag) =>
          tag._id === action.payload._id ? action.payload : tag
        );
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        toast.success("Le tag a bien été supprimé 😀");
        state.data = state.data.filter((tag) => tag._id !== action.payload);
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchTags, addTag, deleteTag, updateTag };
export default tagSlice.reducer;

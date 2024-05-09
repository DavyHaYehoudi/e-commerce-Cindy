import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { toast } from "react-toastify";
import { handleFetchError } from "../../services/errors/handleFetchError";

const fetchTags = createAsyncThunk("tag/fetchTags", async () => {
  try {
    return customFetch("tags");
  } catch (error) {
    handleFetchError(error);
  }
});
const addTag = createAsyncThunk("tag/adTag", async (tagData) => {
  const response = await customFetch("tags", {
    method: "POST",
    body: JSON.stringify(tagData),
  });
  return response;
});

const updateTag = createAsyncThunk("tag/updateTag", async ({ tagId, name }) => {
  const response = await customFetch(`tags/${tagId}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  });
  return response;
});
const deleteTag = createAsyncThunk("tag/deleteTag", async (tagId) => {
  await customFetch(`tags/${tagId}`, {
    method: "DELETE",
  });
  return tagId;
});

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
      })
      .addCase(addTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.data = state.data.map((tag) =>
          tag._id === action.payload._id ? action.payload : tag
        );
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (tag) => tag._id !== action.payload
        );
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      });
  },
});
export { fetchTags, addTag, deleteTag, updateTag };
export default tagSlice.reducer;

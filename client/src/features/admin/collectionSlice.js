import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { updateCategoriesByCollectionId } from "./categorySlice";
import { Del, Get, Post, Put } from "../../services/httpMethods";

const fetchCollections = createAsyncThunk(
  "collection/fetchCollections",
  async () => {
    return Get("collections");
  }
);
const addCollection = createAsyncThunk(
  "collection/addCollection",
  async ({ newCollectionName, handleUnauthorized }) => {
    return await Post(
      "collections",
      { name: newCollectionName },
      null,
      handleUnauthorized
    );
  }
);

const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  async ({ collectionId, name, handleUnauthorized }) => {
    return await Put(
      `collections/${collectionId}`,
      { name },
      null,
      handleUnauthorized
    );
  }
);

const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  async ({ collectionId, productSolded, handleUnauthorized }, { dispatch }) => {
    const url = `collections/${collectionId}`;
    await Del(url, null, handleUnauthorized);
    dispatch(updateCategoriesByCollectionId(collectionId));
    return { collectionId, productSolded };
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    collectionId: "",
  },
  reducers: {
    collectionToRemove: (state, action) => {
      state.collectionId = action.payload;
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
      })
      .addCase(addCollection.fulfilled, (state, action) => {
        state.data = state.data.concat(action.payload);
        toast.success("La collection a bien été enregistrée 😀");
      })
      .addCase(addCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        toast.success("La collection a bien été modifiée 😀");
        state.data = state.data.map((collection) =>
          collection._id === action.payload._id ? action.payload : collection
        );
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        const { collectionId, productSolded } = action.payload;
        if (productSolded) {
          state.data = state.data.map((collection) =>
            collection._id === collectionId
              ? { ...collection, isArchived: true }
              : collection
          );
          toast.success("La collection a bien été archivée.");
        } else {
          state.data = state.data.filter(
            (collection) => collection._id !== collectionId
          );
          toast.success("La collection a bien été supprimée.");
        }
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchCollections, addCollection, deleteCollection, updateCollection };
export const { collectionToRemove } =
  collectionSlice.actions;
export default collectionSlice.reducer;

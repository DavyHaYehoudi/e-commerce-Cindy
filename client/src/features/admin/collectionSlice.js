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
  async ({ collectionId, handleUnauthorized }) => {
    return await Del(`collections/${collectionId}`, null, handleUnauthorized);
  }
);
export const confirmDeleteCollection = createAsyncThunk(
  "collection/confirmDeleteCollection",
  async ({ collectionId, handleUnauthorized }, { dispatch }) => {
    await Del(
      `collections/confirm-delete/${collectionId}`,
      null,
      handleUnauthorized
    );
    dispatch(updateCategoriesByCollectionId(collectionId)); // Dispatch l'action pour mettre à jour le slice category
    return collectionId;
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    collectionId: "",
    alert: "",
    categoriesName: [],
    productsName:[]
  },
  reducers: {
    resetStore: (state, payload) => {
      state.collectionId = "";
      state.alert = "";
      state.categoriesName = [];
      state.productsName=[]
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
        const { message } = action.payload || {};
        if (
          message?.alert ||
          message?.collectionId ||
          message?.categoriesName ||
          message?.productsName
        ) {
          state.alert = message?.alert;
          state.collectionId = message?.collectionId;
          state.categoriesName = message?.categoriesName;
          state.productsName = message?.productsName
        } else {
          state.data = state.data.filter(
            (collection) => collection._id !== action.payload
          );
          toast.success("La collection a bien été supprimée.");
        }
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(confirmDeleteCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(confirmDeleteCollection.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = state.data.filter(
          (collection) => collection._id !== action.payload
        );
        toast.success(
          "La collection a bien été supprimée et le contenu des catégories a été actualisé."
        );
      })
      .addCase(confirmDeleteCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchCollections, addCollection, deleteCollection, updateCollection };
export const { resetStore } = collectionSlice.actions;
export default collectionSlice.reducer;

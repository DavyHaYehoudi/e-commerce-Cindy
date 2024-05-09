import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { toast } from "react-toastify";
import { updateCategoriesByCollectionId } from "./categorySlice";
import { Del, Post, Put } from "../../services/httpMethods";
import { handleFetchError } from "../../services/errors/handleFetchError";

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
const addCollection = createAsyncThunk(
  "collection/addCollection",
  async ({ newCollectionName, handleUnauthorized }) => {
    const response = await Post(
      "collections",
      { name: newCollectionName },
      null,
      handleUnauthorized
    );
    return response;
  }
);

const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  async ({ collectionId, name, handleUnauthorized }) => {
    const response = await Put(
      `collections/${collectionId}`,
      { name },
      null,
      handleUnauthorized
    );
    return response;
  }
);

const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  async ({ collectionId, handleUnauthorized }) => {
    const response = await Del(
      `collections/${collectionId}`,
      null,
      handleUnauthorized
    );
    return response;
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
  },
  reducers: {
    resetStore: (state, payload) => {
      state.collectionId = "";
      state.alert = "";
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
      })
      .addCase(addCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.data = state.data.map((collection) =>
          collection._id === action.payload._id ? action.payload : collection
        );
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        const { message } = action.payload || {};
        if (message?.alert && message?.collectionId) {
          state.alert = message.alert;
          state.collectionId = message.collectionId;
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
        toast.error("Une erreur est survenue !");
        // const errorDetails = JSON.parse(action.error.message);
        // state.error =
        //   errorDetails?.message?.alert || "Une erreur s'est produite.";
        // state.collectionId =
        //   errorDetails?.message?.collectionId || "Une erreur s'est produite.";
        // try {
        //   const errorDetails = JSON.parse(action.error.message);
        //   if (errorDetails.status) {
        //     state.status = errorDetails.status;
        //   } else {
        //     toast.error(action.error.message);
        //   }
        // } catch (parseError) {
        //   toast.error(action.error.message);
        // }
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

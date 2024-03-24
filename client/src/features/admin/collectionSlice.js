import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";
import { toast } from "react-toastify";

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
  async (collectionData) => {
    const response = await customFetch("collections", {
      method: "POST",
      body: JSON.stringify(collectionData),
    });
    return response;
  }
);

const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  async (collectionId) => {
    await customFetch(`collections/${collectionId}`, {
      method: "DELETE",
    });
    return collectionId;
  }
);

const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  async (collectionData) => {
    const response = await customFetch(`collections/${collectionData.id}`, {
      method: "PUT",
      body: JSON.stringify(collectionData),
    });
    return response;
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
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
    builder
      .addCase(addCollection.fulfilled, (state, action) => {
        state.data = state.data.concat(action.payload);
        toast.success("La nouvelle collection a bien été ajoutée !");
      })
      .addCase(addCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (collection) => collection._id !== action.payload
        );
        toast.success("La nouvelle collection a bien été supprimée !");
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.data = state.data.map((collection) =>
          collection.id === action.payload._id ? action.payload : collection
        );
        toast.success("La nouvelle collection a bien été modifiée !");
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      });
  },
});
export { fetchCollections, addCollection, deleteCollection, updateCollection };
export default collectionSlice.reducer;

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

const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  async ({ collectionId, name }) => {
    const response = await customFetch(`collections/${collectionId}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
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
const confirmDeleteCollection = createAsyncThunk(
  "collection/confirmDeleteCollection",
  async (collectionId) => {
    await customFetch(`collections/confirm-delete/${collectionId}`, {
      method: "DELETE",
    });
    return collectionId;
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState: { data: [], status: "idle", error: null, collectionId: "" },
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
        state.data = state.data.filter(
          (collection) => collection._id !== action.payload
        );
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.status = "failed";
        const errorDetails = JSON.parse(action.error.message);
        state.error =
          errorDetails?.message?.messageError || "Une erreur s'est produite.";
        state.collectionId =
          errorDetails?.message?.collectionId || "Une erreur s'est produite.";
        try {
          const errorDetails = JSON.parse(action.error.message);
          if (errorDetails.status) {
            state.status = errorDetails.status;
          } else {
            toast.error(action.error.message);
          }
        } catch (parseError) {
          toast.error(action.error.message);
        }
      });
  },
});
export {
  fetchCollections,
  addCollection,
  deleteCollection,
  confirmDeleteCollection,
  updateCollection,
};
export default collectionSlice.reducer;

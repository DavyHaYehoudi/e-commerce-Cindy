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
  async ({ formData, handleUnauthorized }) => {
    return await Post("collections", formData, null, handleUnauthorized);
  }
);

const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  async (
    {
      collectionId,
      productSolded,
      formData,
      restore = false,
      handleUnauthorized,
    },
    { dispatch }
  ) => {
    await Put(
      `collections/${collectionId}`,
      formData,
      null,
      handleUnauthorized
    );
    dispatch(updateCategoriesByCollectionId({ collectionId }));
    return { collectionId, productSolded, formData, restore };
  }
);

const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  async (
    { collectionId, collectionsStore, handleUnauthorized },
    { dispatch }
  ) => {
    const url = `collections/${collectionId}`;
    await Del(url, null, handleUnauthorized);
    dispatch(
      updateCategoriesByCollectionId({ collectionId, collectionsStore })
    );
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
    illustration: "",
    collectionIdEdit: "",
  },
  reducers: {
    collectionToRemove: (state, action) => {
      state.collectionId = action.payload;
    },
    updateIllustration: (state, action) => {
      state.illustration = action.payload;
    },
    updateCollectionIdEdit: (state, action) => {
      state.collectionIdEdit = action.payload;
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
        const { collectionId, productSolded, formData, restore } =
          action.payload;

        // Trouver l'index de la collection à mettre à jour dans le state
        const updatedCollectionIndex = state.data.findIndex(
          (collection) => collection._id === collectionId
        );

        if (updatedCollectionIndex !== -1) {
          // Créer une nouvelle copie de la collection avec les modifications
          const updatedCollection = {
            ...state.data[updatedCollectionIndex],
            ...formData,
          };

          // Créer une nouvelle copie du state avec la collection mise à jour
          const newState = {
            ...state,
            data: [
              ...state.data.slice(0, updatedCollectionIndex),
              updatedCollection,
              ...state.data.slice(updatedCollectionIndex + 1),
            ],
          };

          // Si productSolded est true, marquer la collection comme archivée
          if (productSolded) {
            updatedCollection.isArchived = true;
            toast.success("La collection a bien été archivée.");
          } else if (restore) {
            toast.success("La collection a bien été restaurée.");
          } else {
            toast.success("La collection a bien été modifiée 😀");
          }

          return newState;
        }

        // Si la collection n'est pas trouvée, retourner simplement le state inchangé
        return state;
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        const collectionId = action.payload;
        state.data = state.data.filter(
          (collection) => collection._id !== collectionId
        );
        toast.success("La collection a bien été supprimée.");
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchCollections, addCollection, deleteCollection, updateCollection };
export const {
  collectionToRemove,
  updateIllustration,
  updateCollectionIdEdit,
} = collectionSlice.actions;
export default collectionSlice.reducer;

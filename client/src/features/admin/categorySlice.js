import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Del, Get, Patch, Post } from "../../services/httpMethods";

const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    return Get("categories");
  }
);

const addCategory = createAsyncThunk(
  "category/addCategories",
  async ({ name, parentCollection, handleUnauthorized }) => {
    return await Post(
      "categories",
      { name, parentCollection },
      null,
      handleUnauthorized
    );
  }
);

const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({
    categoryId,
    formData,
    restore = false,
    productSolded,
    handleUnauthorized,
  }) => {
    await Patch(`categories/${categoryId}`, formData, null, handleUnauthorized);
    return { categoryId, productSolded, formData, restore };
  }
);
const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ categoryId, handleUnauthorized }) => {
    await Del(`categories/${categoryId}`, null, handleUnauthorized);
    return categoryId;
  }
);

const categoriesSlice = createSlice({
  name: "category",
  initialState: { data: [], categoryId: "", status: "idle", error: null },
  reducers: {
    updateCategoriesByCollectionId: (state, action) => {
      const { collectionId } = action.payload;

      state.data = state.data.map((category) => ({
        ...category,
        parentCollection: category.parentCollection.filter(
          (pc) => pc !== collectionId
        ),
      }));
    },

    categoryToRemove: (state, action) => {
      state.categoryId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.data = state.data.concat(action.payload);
        toast.success("La catégorie a bien été créée 😀");
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { categoryId, productSolded, formData, restore } =
        action.payload;

      // Trouver l'index de la categorie à mettre à jour dans le state
      const updatedCategoryIndex = state.data.findIndex(
        (category) => category._id === categoryId
      );

      if (updatedCategoryIndex !== -1) {
        // Créer une nouvelle copie de la categorie avec les modifications
        const updatedCategory = {
          ...state.data[updatedCategoryIndex],
          ...formData,
        };

        // Créer une nouvelle copie du state avec la categorie mise à jour
        const newState = {
          ...state,
          data: [
            ...state.data.slice(0, updatedCategoryIndex),
            updatedCategory,
            ...state.data.slice(updatedCategoryIndex + 1),
          ],
        };

        // Si productSolded est true, marquer la categorie comme archivée
        if (productSolded) {
          updatedCategory.isArchived = true;
          toast.success("La catégorie a bien été archivée.");
        } else if (restore) {
          toast.success("La catégorie a bien été restaurée.");
        } else {
          toast.success("La catégorie a bien été modifiée 😀");
        }

        return newState;
      }

      // Si la categorie n'est pas trouvée, retourner simplement le state inchangé
      return state;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (category) => category._id !== action.payload
        );
        toast.success("La catégorie a bien été supprimée 😀");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchCategories, addCategory, deleteCategory, updateCategory };
export const { updateCategoriesByCollectionId, categoryToRemove } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;

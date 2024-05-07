import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";
import { toast } from "react-toastify";

const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try {
      return customFetch("categories");
    } catch (error) {
      handleFetchError(error);
    }
  }
);

const addCategory = createAsyncThunk(
  "category/addCategories",
  async (categoryData) => {
    const response = await customFetch("categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
    return response;
  }
);

const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ categoryId, name ,parentCollection}) => {
    const response = await customFetch(`categories/${categoryId}`, {
      method: "PATCH",
      body: JSON.stringify({ name,parentCollection }),
    });
    return response;
  }
);
const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId) => {
    await customFetch(`categories/${categoryId}`, {
      method: "DELETE",
    });
    return categoryId;
  }
);

const categoriesSlice = createSlice({
  name: "category",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    updateCategoriesByCollectionId: (state, action) => {
      const  collectionId  = action.payload;
      state.data.forEach((category) => {
        // Filtrer les IDs de parentCollection différents de collectionId
        const filteredParentCollection = category.parentCollection.filter(
          (parentId) => parentId !== collectionId
        );
        category.parentCollection = filteredParentCollection;
      });
      // Filtrer les catégories avec une parentCollection vide
      state.data = state.data.filter((category) => category.parentCollection.length > 0);
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
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.data = state.data.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("Une erreur est survenue !");
      });
  },
});
export { fetchCategories, addCategory, deleteCategory, updateCategory };
export const { updateCategoriesByCollectionId } = categoriesSlice.actions;
export default categoriesSlice.reducer;

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
  async ({ categoryId, name, parentCollection, handleUnauthorized }) => {
    return await Patch(
      `categories/${categoryId}`,
      { name, parentCollection },
      null,
      handleUnauthorized
    );
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

      state.data = state.data.map(category => ({
        ...category,
        parentCollection: category.parentCollection.filter(pc => pc !== collectionId)
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
        state.data = state.data.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
        toast.success("La catégorie a bien été modifiée 😀");
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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";
import { toast } from "react-toastify";

const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (query = {}) => {
    const queryString = new URLSearchParams(query).toString();

    try {
      return customFetch(`products?${queryString}`);
    } catch (error) {
      handleFetchError(error);
    }
  }
);
const addProduct = createAsyncThunk("products/addProduct", async (formData) => {
  try {
    await customFetch("products", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    toast.success("Le produit a été créé avec succès !");
  } catch (error) {
    toast.error(`Une erreur s'est produite avec l'envoi des données`);
    console.error("Erreur lors de l'envoi des données à l'API:", error);
    throw error;
  }
});
const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ formData, productId }) => {
    try {
      const response = await customFetch(`products/${productId}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
      });
      toast.success("Le produit a été modifié avec succès !");
      return response;
    } catch (error) {
      toast.error(`Une erreur s'est produite avec l'envoi des données`);
      console.error("Erreur lors de l'envoi des données à l'API:", error);
      throw error;
    }
  }
);
const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    try {
      const response = await customFetch(`products/${productId}`, {
        method: "DELETE",
      });
      toast.success("Le produit a été supprimé avec succès !");
      return response;
    } catch (error) {
      toast.error(`Une erreur s'est produite avec l'envoi des données`);
      console.error("Erreur lors de l'envoi des données à l'API:", error);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    totalProductsCount: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const { products, totalProductsCount } = action.payload;
        state.status = "succeeded";
        state.error = null;
        state.data = products;
        state.totalProductsCount = totalProductsCount;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = [action.payload].concat(state.data);
        state.totalProductsCount += 1;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const { productId } = action.payload;
        state.data = state.data.filter((product) => product?._id !== productId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchProduct, addProduct, editProduct, deleteProduct };
export default productSlice.reducer;

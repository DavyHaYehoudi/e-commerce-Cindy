import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";
import { toast } from "react-toastify";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

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
    const response = await customFetch("products", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    toast.success("Le produit a été créé avec succès !");
    return response;
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
const updateMainImageToFirebaseStorage = createAsyncThunk(
  "products/updateFirebaseStorage",
  async ({ originalsMainImagesStore, materialsProduct }) => {
    try {
      const mainImagesToRemove = originalsMainImagesStore?.filter((element) =>
        materialsProduct.some((mat) => mat?.main_image !== element?.main_image)
      );

      const mainImagesToAdd = materialsProduct?.filter((element) =>
        originalsMainImagesStore.some(
          (image) => image?.main_image !== element?.main_image
        )
      );
      console.log("mainImagesToRemove:", mainImagesToRemove);
      console.log("mainImagesToAdd:", mainImagesToAdd);
      // const uniqueId = uuidv4();
      // const fileExtension = file.name.split(".").pop();
      // const filePath = `products/main/${uniqueId}.${fileExtension}`;
      if (mainImagesToAdd.length > 0) {
        mainImagesToAdd.forEach(async (path) => {
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, "products/main");
        });
      }
    } catch (error) {
      console.log("Erreur lors de l'update à Firebase Storage :", error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    totalProductsCount: "",
    materials: [],
    originalsMainImages: [],
    mainImagesToAddStorage: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateProductMaterials: (state, action) => {
      const { _id, stock, newDate, pricing, promo, main_image } =
        action.payload || {};

      const existingMaterialIndex = state.materials.findIndex(
        (material) => material._id === _id
      );
      if (existingMaterialIndex !== -1) {
        const updatedMaterial = { ...state.materials[existingMaterialIndex] };

        if (stock !== undefined) updatedMaterial.stock = stock;
        if (newDate !== undefined) updatedMaterial.newDate = newDate;
        if (pricing !== undefined) updatedMaterial.pricing = pricing;
        if (promo !== undefined) updatedMaterial.promo = promo;
        if (main_image !== undefined) updatedMaterial.main_image = main_image;

        state.materials[existingMaterialIndex] = updatedMaterial;
      } else {
        state.materials = [...state.materials, action.payload];
      }
    },

    resetProductMaterials: (state, action) => {
      state.materials = [];
    },
    addOriginalsMainImages: (state, action) => {
      state.originalsMainImages = action.payload.map(
        (element) => element?.main_image
      );
      state.materials = action.payload;
    },
    addMainImagesToStorage: (state, action) => {
      const { materialId, file } = action.payload;
      console.log('action.payload:', action.payload)
      const existingMaterialIndex = state.mainImagesToAddStorage.findIndex(
        (material) => material._id === materialId
      );
      if (existingMaterialIndex !== -1) {
        const updatedMainImage = {
          ...state.mainImagesToAddStorage[existingMaterialIndex],
        };
        state.materials[existingMaterialIndex] = updatedMainImage;
      } else {
        state.mainImagesToAddStorage = [
          ...state.mainImagesToAddStorage,
          { _id: materialId, file },
        ];
      }
    },
  },
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
        const updatedProduct = action.payload;
        const index = state.data.findIndex(
          (product) => product?._id === updatedProduct?._id
        );
        if (index !== -1) {
          state.data[index] = updatedProduct;
        }
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
export {
  fetchProduct,
  addProduct,
  editProduct,
  deleteProduct,
  updateMainImageToFirebaseStorage,
};
export const {
  addOriginalsMainImages,
  updateProductMaterials,
  resetProductMaterials,
  addMainImagesToStorage,
} = productSlice.actions;
export default productSlice.reducer;

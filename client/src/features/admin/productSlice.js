import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Del, Get, Patch, Post } from "../../services/httpMethods";

const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (query = {}) => {
    const queryString = new URLSearchParams(query).toString();
    return Get(`products?${queryString}`);
  }
);
const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ formData, handleUnauthorized }) => {
    return await Post("products", formData, null, handleUnauthorized);
  }
);
const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ formData, productId, handleUnauthorized }) => {
    return await Patch(
      `products/${productId}`,
      { formData },
      null,
      handleUnauthorized
    );
  }
);
const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ productId, handleUnauthorized }) => {
    await Del(`products/${productId}`, null, handleUnauthorized);
    return productId;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    totalProductsCount: "",
    materials: [],
    mainImagesToRemoveStorage: [],
    isProductCheetModified: false,
    isPendingProduct: false,
    cartAccess: false,
    wishlistAccess: false,
    checkedItemsFilter: {},
    advantages: {
      codePromo: { isValid: false, percentage: "", code: "" },
      giftcard: { isValid: false, amount: "", code: "" },
      credit: { isValid: false, creditId: "", amount: "" },
    },
    cartAmount: "",
    isBillingSameAddress: true,
    isRememberMe: true,
    status: "idle",
    error: null,
  },
  reducers: {
    updateProductMaterials: (state, action) => {
      const {
        _id,
        stock,
        newDate,
        pricing,
        promo,
        main_image,
        isActive,
        isStar,
      } = action.payload || {};

      const existingMaterialIndex = state.materials.findIndex(
        (material) => material._id === _id
      );
      if (existingMaterialIndex !== -1) {
        const updatedMaterial = { ...state.materials[existingMaterialIndex] };

        if (stock !== undefined) updatedMaterial.stock = stock;
        if (newDate !== undefined) updatedMaterial.untilNew = newDate;
        if (pricing !== undefined) updatedMaterial.pricing = pricing;
        if (promo !== undefined) updatedMaterial.promotion = promo;
        if (main_image !== undefined) updatedMaterial.main_image = main_image;
        if (isActive !== undefined) updatedMaterial.isActive = isActive;
        if (isStar !== undefined) updatedMaterial.isStar = isStar;

        state.materials[existingMaterialIndex] = updatedMaterial;
      } else {
        state.materials = [...state.materials, action.payload];
      }
    },
    resetProductMaterials: (state, action) => {
      state.materials = [];
    },
    initProductMaterials: (state, action) => {
      state.materials = action.payload;
    },
    mainImagesToRemoveStorage: (state, action) => {
      state.mainImagesToRemoveStorage = [
        ...state.mainImagesToRemoveStorage,
        action.payload,
      ];
    },
    resetStore: (state, action) => {
      state.materials = [];
      state.mainImagesToRemoveStorage = [];
    },
    modifyProductCheet: (state, action) => {
      state.isProductCheetModified = action.payload;
    },
    changeProductActiveStatus: (state, action) => {
      const { productId, status, isPending } = action.payload;
      state.data = state.data.map((product) =>
        product._id === productId ? { ...product, isActive: status } : product
      );
      state.isPendingProduct = isPending;
    },
    showCartAccess: (state, action) => {
      state.cartAccess = action.payload;
    },
    showWishlistAccess: (state, action) => {
      state.wishlistAccess = action.payload;
    },
    checkItemsFilter: (state, action) => {
      state.checkedItemsFilter = action.payload;
    },
    toggleCheckBilling: (state, action) => {
      state.isBillingSameAddress = !state.isBillingSameAddress;
    },
    toggleCheckRememberMe: (state, action) => {
      state.isRememberMe = !state.isRememberMe;
    },
    updateAdvantages: (state, action) => {
      const {
        property,
        isValid = false,
        percentage = "",
        amount = "",
        id = "",
        code = "",
        creditId = "",
        clientId = "",
      } = action.payload;
      state.advantages = {
        ...state.advantages,
        [property]: {
          isValid,
          percentage,
          amount,
          id,
          code,
          creditId,
          clientId,
        },
      };
    },
    resetAdvantages:(state,action)=>{
      state.advantages = {...state.advantages,
        codePromo: { isValid: false, percentage: "", code: "" },
        giftcard: { isValid: false, amount: "", code: "" },
        credit: { isValid: false, creditId: "", amount: "" },
      }
    },
    updateCartAmount: (state, action) => {
      state.cartAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        const { products, totalProductsCount } = action.payload || {};
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
        toast.success("Le produit a bien été enregistré 😀");
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        toast.success("Le produit a bien été modifié 😀");
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
        toast.success("Le produit a bien été supprimé 😀");
        state.status = "succeeded";
        state.error = null;
        state.totalProductsCount -= 1;
        const productId = action.payload;
        state.data = state.data.filter((product) => product?._id !== productId);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchProduct, addProduct, editProduct, deleteProduct };
export const {
  updateProductMaterials,
  resetProductMaterials,
  mainImagesToRemoveStorage,
  initProductMaterials,
  resetStore,
  modifyProductCheet,
  changeProductActiveStatus,
  showCartAccess,
  showWishlistAccess,
  checkItemsFilter,
  updateAdvantages,
  resetAdvantages,
  updateCartAmount,
  toggleCheckBilling,
  toggleCheckRememberMe,
} = productSlice.actions;
export default productSlice.reducer;

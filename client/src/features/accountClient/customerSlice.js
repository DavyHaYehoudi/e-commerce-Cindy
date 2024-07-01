import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Del, Get, Post } from "../../services/httpMethods";

const fetchCustomer = createAsyncThunk(
  "client/fetchCustomer",
  async ({ clientId, handleUnauthorized }) => {
    return Get(`clients/${clientId}`, null, handleUnauthorized);
  }
);
const addClientTrackingNumber = createAsyncThunk(
  "orders/addClientTrackingNumber",
  async ({ orderId, trackingNumber, handleUnauthorized }) => {
    await Post(
      `orders/${orderId}/trackingnumber_client`,
      { trackingNumber },
      null,
      handleUnauthorized
    );
    return { orderId, trackingNumber };
  }
);
const deleteTrackingNumber = createAsyncThunk(
  "orders/deleteClientTrackingNumber",
  async ({ orderId, trackingNumberId, handleUnauthorized }) => {
    await Del(
      `orders/${orderId}/trackingnumber_client/${trackingNumberId}`,
      null,
      handleUnauthorized
    );
    return { orderId, trackingNumberId };
  }
);

const customer = createSlice({
  name: "customer",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    avatar: "",
  },
  reducers: {
    updateClientField: (state, action) => {
      const { fieldName, nestedFieldName, value } = action.payload;
      if (nestedFieldName) {
        state.data.client = {
          ...state.data.client,
          [nestedFieldName]: {
            ...state.data.client[nestedFieldName],
            [fieldName]: value,
          },
        };
      } else {
        state.data.client = { ...state.data.client, [fieldName]: value };
      }
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    resetCustomerStore: (state, action) => {
      state.data = [];
      state.avatar = "";
      state.status = "idle";
    },
    toggleFavorite: (state, action) => {
      const { productsId, material } = action.payload;
      if (!productsId) return;

      const existingProductIndex = state.data.client.wishlist.findIndex(
        (item) => {
          if (material) {
            return item.productsId === productsId && item.material === material;
          } else {
            return item.productsId === productsId;
          }
        }
      );

      if (existingProductIndex >= 0) {
        state.data.client.wishlist = state.data.client.wishlist.filter(
          (item) => {
            if (material) {
              return !(
                item.productsId === productsId && item.material === material
              );
            } else {
              return item.productsId !== productsId;
            }
          }
        );
      } else {
        state.data.client.wishlist = [
          ...state.data.client.wishlist,
          action.payload,
        ];
      }
    },
    addOneProductToCart: (state, action) => {
      const { productsId, material, quantity = 1 } = action.payload;
      const addDate = new Date().toISOString();
      if (!productsId) return;
      const existingProduct = state.data.client.cart.find((item) => {
        if (material) {
          return item?.productsId === productsId && item?.material === material;
        } else {
          return item?.productsId === productsId;
        }
      });
      if (!existingProduct) {
        state.data.client.cart = [
          ...state.data.client.cart,
          { productsId, material, quantity, addDate },
        ];
      }
    },
    removeOneProductToCart: (state, action) => {
      const { productsId, material } = action.payload;
      if (!productsId) return;
      const existingProductIndex = state.data.client.cart.findIndex((item) => {
        if (material) {
          return item.productsId === productsId && item.material === material;
        } else {
          return item.productsId === productsId;
        }
      });

      if (existingProductIndex >= 0) {
        state.data.client.cart = state.data.client.cart.filter((item) => {
          if (material) {
            return !(
              item.productsId === productsId && item.material === material
            );
          } else {
            return item.productsId !== productsId;
          }
        });
      }
    },
    changeQuantityProductToCart: (state, action) => {
      const { productId, materialId, quantity } = action.payload;
      state.data.client.cart = state.data.client.cart.map((product) => {
        if (
          product?.productsId === productId &&
          product?.material === materialId
        ) {
          return { ...product, quantity };
        } else {
          return product;
        }
      });
    },
    addWishlistToCart: (state, action) => {
      const { wishlist } = action.payload;
      state.data.client.cart = [...state.data.client.cart, ...wishlist];
    },
    clearWishlist: (state, action) => {
      state.data.client.wishlist = [];
    },
    clearCart: (state, action) => {
      state.data.client.cart = [];
    },
    updateShippingAndBillingAddresses: (state, action) => {
      const { property, field, value } = action.payload;
      if (!state.data.client) {
        state.data.client = {};
      }
      if (!state.data.client[property]) {
        state.data.client[property] = {};
      }
      state.data.client[property][field] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addClientTrackingNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addClientTrackingNumber.fulfilled, (state, action) => {
        toast.success("Le numéro de suivi a bien été enregistré 😀");
        state.status = "succeeded";
        state.error = null;
        state.data.orders = state?.data?.orders?.map((order) =>
          order._id === action.payload.orderId
            ? {
                ...order,
                trackingNumber: [
                  ...order.trackingNumber,
                  action.payload.trackingNumber,
                ],
              }
            : order
        );
      })
      .addCase(addClientTrackingNumber.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTrackingNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTrackingNumber.fulfilled, (state, action) => {
        toast.success("Le numéro de suivi a bien été supprimé 😀");
        state.status = "succeeded";
        state.error = null;
        state.data.orders = state?.data?.orders?.map((order) =>
          order?._id === action.payload.orderId
            ? {
                ...order,
                trackingNumber: order.trackingNumber.filter(
                  (tn) => tn?.id !== action.payload.trackingNumberId
                ),
              }
            : order
        );
      })
      .addCase(deleteTrackingNumber.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const {
  updateClientField,
  updateAvatar,
  addCredentials,
  resetCustomerStore,
  toggleFavorite,
  addOneProductToCart,
  removeOneProductToCart,
  addWishlistToCart,
  clearCart,
  clearWishlist,
  changeQuantityProductToCart,
  updateShippingAndBillingAddresses,
} = customer.actions;
export { fetchCustomer, addClientTrackingNumber, deleteTrackingNumber };
export default customer.reducer;

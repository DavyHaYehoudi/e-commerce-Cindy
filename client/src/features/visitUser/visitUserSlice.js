import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Get } from "../../services/httpMethods";

const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    return Get("categories");
  }
);

const visitUserSlice = createSlice({
  name: "visitUser",
  initialState: {
    // {
    //     productsId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    //     material: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
    //     quantity: { type: Number, default: 1 },
    //     addDate: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    wishlist: [],
    cart: [],
    status: "idle",
    error: null,
  },
  reducers: {
    likeVisitor: (state, action) => {
      const { productsId, material } = action.payload;
      if (!productsId) return;
      const addDate = new Date().toISOString();

      const existingProductIndex = state.wishlist.findIndex((item) => {
        if (material) {
          return item.productsId === productsId && item.material === material;
        } else {
          return item.productsId === productsId;
        }
      });

      if (existingProductIndex >= 0) {
        state.wishlist = state.wishlist.filter((item) => {
          if (material) {
            return !(
              item.productsId === productsId && item.material === material
            );
          } else {
            return item.productsId !== productsId;
          }
        });
      } else {
        state.wishlist = [...state.wishlist, { productsId, material, addDate }];
      }
    },
    initWishlist:(state,action)=>{
      state.wishlist = action.payload
    }
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
      });
  },
});
export const { likeVisitor ,initWishlist} = visitUserSlice.actions;
export { fetchCategories };
export default visitUserSlice.reducer;

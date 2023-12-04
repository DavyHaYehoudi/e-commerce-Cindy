import { createSlice } from "@reduxjs/toolkit";
import { productsMock } from "../../mocks/productsMock";
import * as actions from "../../constants/productsActions";

const productsSlice = createSlice({
  name: "products",
  initialState: productsMock,
  reducers: {
    updateActionContent: (state, action) => {
      const {
        productId,
        updatedProperty,
        isClientNotified,
        productActionContent,
      } = action.payload;

      return state.map((product) => {
        if (product.productId === productId) {
          if (updatedProperty === actions.CREDIT) {
            return {
              ...product,
              isClientNotified,
              productsActions: {
                ...product.productsActions,
                [updatedProperty]: {
                  amount: productActionContent.amount,
                  code: productActionContent.code,
                  dateExpire: productActionContent.dateExpire,
                },
              },
            };
          }
          return {
            ...product,
            isClientNotified,
            productsActions: {
              ...product.productsActions,
              [updatedProperty]: productActionContent,
            },
          };
        }
        return product;
      });
    },
  },
});
export const { updateActionContent } = productsSlice.actions;
export default productsSlice.reducer;

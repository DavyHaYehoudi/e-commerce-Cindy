import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";

const productActionsSlice = createSlice({
  name: "productActions",
  initialState: usersMock,
  reducers: {
    updateActionContent: (state, action) => {
      const { clientId, productId, orderId, updatedProperty,productActionContent } = action.payload;

      return state.map((user) => {
        if (user.id === clientId) {
          return {
            ...user,
            orders: user.orders.map((order) => {
              if (order.id === orderId) {
                return {
                  ...order,
                  products: order.products.map((product) => {
                    if (product.productId === productId) {
                      return {
                        ...product,
                        productActions: {
                          ...product.productActions,
                          [updatedProperty]: productActionContent,
                        },
                      };
                    }
                    return product;
                  }),
                };
              }
              return order;
            }),
          };
        }
        return user;
      });
    },
  
  },
});

export const { updateActionContent } =
  productActionsSlice.actions;
export default productActionsSlice.reducer;

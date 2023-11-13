import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";

const productActionsSlice = createSlice({
  name: "productActions",
  initialState: usersMock,
  reducers: {
    updateNoteContent: (state, action) => {
      const { clientId, productId, orderId, content } = action.payload;

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
                          addNoteProduct: content,
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

export const { updateNoteContent } = productActionsSlice.actions;
export default productActionsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";
import * as actions from "../../constants/productsActions";

const productsActionsSlice = createSlice({
  name: "productsActions",
  initialState: usersMock,
  reducers: {
    updateActionContent: (state, action) => {
      const {
        clientId,
        productId,
        orderId,
        updatedProperty,
        isClientNotified,
        productActionContent,
      } = action.payload;

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
    updateTotalsInOut: (state, action) => {
      const { clientId, orderId, amount, movement } = action.payload;

      return state.map((user) => {
        if (user.id === clientId) {
          return {
            ...user,
            orders: user.orders.map((order) => {
              if (order.id === orderId) {
                if (movement === "out") {
                  return {
                    ...order,
                    outTotalAmount: order.outTotalAmount + amount,
                  };
                } else if (movement === "outCancel") {
                  return {
                    ...order,
                    outTotalAmount: order.outTotalAmount - amount,
                  };
                }
              }
              return order;
            }),
          };
        }
        return user;
      });
    },
    updateIsClientNotifiedProduct: (state, action) => {
      const { clientId, orderId } = action.payload;

      return state.map((user) => {
        if (user.id === clientId) {
          return {
            ...user,
            orders: user.orders.map((order) => {
              if (order.id === orderId) {
                return {
                  ...order,
                  products: order.products.map((product) => ({
                    ...product,
                    isClientNotified: true,
                  })),
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

export const {
  updateActionContent,
  updateTotalsInOut,
  updateIsClientNotifiedProduct,
} = productsActionsSlice.actions;
export default productsActionsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";
import * as actions from "../../constants/productActions";

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
    processProduct: (state, action) => {
      const { clientId, productId, orderId, process, creditValue } =
        action.payload;
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
                      let updatedProductActions = { ...product.productActions };

                      switch (process) {
                        case actions.REFUND:
                          updatedProductActions = {
                            ...updatedProductActions,
                            refund: true,
                            exchange: false,
                            generateCredit: null,
                          };
                          break;
                        case actions.EXCHANGE:
                          updatedProductActions = {
                            ...updatedProductActions,
                            refund: false,
                            exchange: true,
                            generateCredit: null,
                          };
                          break;
                        case actions.GENERATE_CREDIT:
                          updatedProductActions = {
                            ...updatedProductActions,
                            refund: false,
                            exchange: false,
                            generateCredit: creditValue,
                          };
                          break;
                        case actions.CANCEL_MENTION:
                          updatedProductActions = {
                            ...updatedProductActions,
                            refund: false,
                            exchange: false,
                            generateCredit:null,
                          };
                          break;
                        default:
                          console.log("Error clic actions redux store");
                          break;
                      }

                      return {
                        ...product,
                        productActions: updatedProductActions,
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

export const { updateNoteContent, processProduct } =
  productActionsSlice.actions;
export default productActionsSlice.reducer;

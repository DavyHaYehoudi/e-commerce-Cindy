import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import customerReducer from "../features/accountClient/customerSlice";
import ordersReducer from "../features/admin/ordersSlice";
import orderProductsReducer from "../features/admin/orderProductsSlice";
import productReducer from "../features/admin/productSlice";
import clientsReducer from "../features/admin/clientsSlice";
import creditReducer from "../features/admin/creditSlice";
import materialReducer from "../features/admin/materialSlice";
import promocodeReducer from "../features/admin/promocodeSlice";
import categoryReducer from "../features/admin/categorySlice";
import tagReducer from "../features/admin/tagSlice";
import collectionReducer from "../features/admin/collectionSlice";
import authenticationReducer from "../features/authentication/authenticationSlice";

export const configureStoreWithRole = (role) => {
  // console.log('role dans configureStoreWithRole:', role)
  let reducers;
  if (role === "admin") {
    reducers = {
      clients: clientsReducer,
      orders: ordersReducer,
      orderProducts: orderProductsReducer,
      product: productReducer,
      credit: creditReducer,
      material: materialReducer,
      promocode: promocodeReducer,
      category: categoryReducer,
      tag: tagReducer,
      collection: collectionReducer,
      authentication: authenticationReducer,
    };
  } else {
    reducers = {
      customer: customerReducer,
      category: categoryReducer,
      tag: tagReducer,
      material: materialReducer,
      product: productReducer,
      collection: collectionReducer,
      authentication: authenticationReducer,
    };
  }

  return configureStore({
    reducer: combineReducers(reducers),
  });
};

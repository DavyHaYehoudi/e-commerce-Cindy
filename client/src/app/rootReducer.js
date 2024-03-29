// rootReducer.js
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

const rootReducer = (state, action) => {
  return combineReducers({
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
    customer: customerReducer,
  })(state, action);
};
// const rootReducer = (state, action) => {
//     const isAdmin =true
//   if (isAdmin) {
//     return combineReducers({
//       ordersActions: orderStepReducer,
//       notes: notesReducer,
//     })(state, action);
//   } else if (!isAdmin) {
//     return combineReducers({
//       client: returnProductReducer,
//     })(state, action);
//   }

//   return state;
// };

export default rootReducer;

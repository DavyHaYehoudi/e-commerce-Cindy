// rootReducer.js
import { combineReducers } from "redux";
import returnProductReducer from "../features/accountClient/returnProductSlice";
import ordersReducer from "../features/admin/ordersSlice";
import productsReducer from "../features/admin/productsSlice";
import productReducer from "../features/admin/productSlice";
import clientsReducer from "../features/admin/clientsSlice";
import creditsReducer from "../features/admin/creditsSlice";

const rootReducer = (state, action) => {
  return combineReducers({
    clients: clientsReducer,
    orders: ordersReducer,
    products: productsReducer,
    product: productReducer,
    client: returnProductReducer,
    credits: creditsReducer,
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

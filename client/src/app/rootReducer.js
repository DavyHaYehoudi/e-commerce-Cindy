// rootReducer.js
import { combineReducers } from "redux";
import orderStepReducer from "../features/admin/orderStepSlice";
import notesReducer from "../features/admin/notesSlice";
import returnProductReducer from "../features/accountClient/returnProductSlice";
import productsActionsReducer from "../features/admin/productsActionsSlice";
import ordersReducer from "../features/admin/ordersSlice";
import productsReducer from "../features/admin/productsSlice";
import productReducer from "../features/admin/productSlice";
import clientsReducer from "../features/admin/clientsSlice";
import trackingNumberReducer from "../features/admin/trackingNumberSlice";

const rootReducer = (state, action) => {
  return combineReducers({
    clients: clientsReducer,
    orders:ordersReducer,
    products: productsReducer,
    product: productReducer,
    ordersActions: orderStepReducer,
    productsActions: productsActionsReducer,
    trackingNumber: trackingNumberReducer,
    notes: notesReducer,
    client: returnProductReducer,
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

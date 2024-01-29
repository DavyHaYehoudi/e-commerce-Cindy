// rootReducer.js
import { combineReducers } from "redux";
import customerReducer from "../features/accountClient/customerSlice";
import ordersReducer from "../features/admin/ordersSlice";
import productsByOrderReducer from "../features/admin/productsByOrderSlice";
import productReducer from "../features/admin/productSlice";
import clientsReducer from "../features/admin/clientsSlice";
import creditReducer from "../features/admin/creditSlice";

const rootReducer = (state, action) => {
  return combineReducers({
    clients: clientsReducer,
    orders: ordersReducer,
    productsByOrder: productsByOrderReducer,
    product: productReducer,
    credit: creditReducer,
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

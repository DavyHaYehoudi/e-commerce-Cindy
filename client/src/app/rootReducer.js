// rootReducer.js
import { combineReducers } from "redux";
import orderStepReducer from "../features/admin/orderStepSlice";
import notesReducer from "../features/admin/notesSlice";
import returnProductReducer from "../features/accountClient/returnProductSlice";
import productActionsReducer from "../features/admin/productActionsSlice";

const rootReducer = (state, action) => {
  return combineReducers({
    ordersStep: orderStepReducer,
    notes: notesReducer,
    productActions: productActionsReducer,
    client: returnProductReducer,
  })(state, action);
};
// const rootReducer = (state, action) => {
//     const isAdmin =true
//   if (isAdmin) {
//     return combineReducers({
//       ordersStep: orderStepReducer,
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

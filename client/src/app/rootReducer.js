// rootReducer.js
import { combineReducers } from "redux";
import orderStepReducer from "../features/admin/orderStepSlice";
import notesReducer from "../features/admin/notesSlice";
import returnProductReducer from "../features/accountClient/returnProductSlice";

const rootReducer = (state, action) => {
    // const isAdmin =true
    const isAdmin =false
  if (isAdmin) {
    return combineReducers({
      ordersStep: orderStepReducer,
      notes: notesReducer,
      // ... autres slices admin
    })(state, action);
  } else if (!isAdmin) {
    return combineReducers({
      client: returnProductReducer,
      // ... autres slices client
    })(state, action);
  }

  return state;
};

export default rootReducer;

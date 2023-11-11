import { configureStore } from "@reduxjs/toolkit";
import orderStepReducer from "../features/admin/orderStepSlice";
import notesReducer from "../features/admin/notesSlice";
import returnProductReducer from "../features/accountClient/returnProductSlice";

export const store = configureStore({
  reducer: {
    ordersStep: orderStepReducer,
    notes: notesReducer,
    returnProduct: returnProductReducer,
  },
});

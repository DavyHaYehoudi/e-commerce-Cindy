import { configureStore } from '@reduxjs/toolkit'
import orderStepReducer from "../features/orderStepSlice"
import notesReducer from "../features/notesSlice"

export const store = configureStore({
  reducer: {
    ordersStep:orderStepReducer,
    notes:notesReducer,
  },
})
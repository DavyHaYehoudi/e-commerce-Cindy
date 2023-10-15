import { configureStore } from '@reduxjs/toolkit'
import orderStepReducer from "../features/orderStepSlice"

export const store = configureStore({
  reducer: {
    ordersStep:orderStepReducer,
  },
})
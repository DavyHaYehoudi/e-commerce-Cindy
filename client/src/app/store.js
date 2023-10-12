import { configureStore } from '@reduxjs/toolkit'
import orderStatusReducer from "../features/orderStatusSlice"

export const store = configureStore({
  reducer: {
    ordersStatus:orderStatusReducer,
  },
})
import { createSlice } from "@reduxjs/toolkit";
import { ordersMock } from "../../mocks/ordersMock";

const ordersSlice = createSlice({
  name: "orders",
  initialState: ordersMock,
  reducers: {
    
  },
});

export default ordersSlice.reducer;

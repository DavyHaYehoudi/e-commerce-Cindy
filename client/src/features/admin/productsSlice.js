import { createSlice } from "@reduxjs/toolkit";
import { productsMock } from "../../mocks/productsMock";

const productsSlice = createSlice({
  name: "products",
  initialState: productsMock,
  reducers: {
    
  },
});

export default productsSlice.reducer;

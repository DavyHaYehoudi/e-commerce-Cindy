import { createSlice } from "@reduxjs/toolkit";
import { productMock } from "../../mocks/productMock";

const productSlice = createSlice({
  name: "product",
  initialState: productMock,
  reducers: {
    
  },
});

export default productSlice.reducer;

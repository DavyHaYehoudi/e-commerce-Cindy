import { createSlice } from "@reduxjs/toolkit";
import { clientsMock } from "../../mocks/clientsMock";

const clientsSlice = createSlice({
  name: "clients",
  initialState: clientsMock,
  reducers: {
    
  },
});

export default clientsSlice.reducer;
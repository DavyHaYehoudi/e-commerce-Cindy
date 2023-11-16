import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";

const clientsSlice = createSlice({
  name: "clients",
  initialState: usersMock,
  reducers: {
    
  },
});

export default clientsSlice.reducer;
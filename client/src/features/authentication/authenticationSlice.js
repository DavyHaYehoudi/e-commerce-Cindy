import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "orderProducts",
  initialState: { token: "", status: "idle", error: null },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.token = "";
    },
  },
});
export const { addToken, removeToken } = authenticationSlice.actions;
export default authenticationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "orderProducts",
  initialState: {
    token: "",
    role: "",
    clientId: "",
    status: "idle",
    error: null,
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    addRole: (state, action) => {
      state.role = action.payload;
    },
    addClientId: (state, action) => {
      state.clientId = action.payload;
    },
    resetStore: (state, action) => {
      state.token = "";
      state.role = "";
      state.clientId = "";
    },
  },
});
export const { addToken, addRole, addClientId, resetStore } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;

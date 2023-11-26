import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";

const trackingNumberSlice = createSlice({
  name: "trackingNumber",
  initialState: usersMock,
  reducers: {
    addTrackingNumber: (state, action) => {
        const { clientId, content } = action.payload;
        const userIndex = state.findIndex((user) => user.id === clientId);
  
        if (userIndex !== -1) {
          state[userIndex] = {
            ...state[userIndex],
            notesAdmin: state[userIndex].notesAdmin
              ? [...state[userIndex].notesAdmin, content]
              : [content],
          };
        }
      },
  },
});

export const {addTrackingNumber } = trackingNumberSlice.actions;
export default trackingNumberSlice.reducer;

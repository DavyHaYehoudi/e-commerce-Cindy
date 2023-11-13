// notesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";

const notesSlice = createSlice({
  name: "notes",
  initialState: usersMock,
  reducers: {
    addNote: (state, action) => {
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
    deleteNote: (state, action) => {
      const { clientId, noteIndex } = action.payload;
      const userIndex = state.findIndex((user) => user.id === clientId);

      if (userIndex !== -1 && state[userIndex].notesAdmin) {
        state[userIndex] = {
          ...state[userIndex],
          notesAdmin: state[userIndex].notesAdmin.filter(
            (_, index) => index !== noteIndex
          ),
        };
      }
    },
  },
});

export const { addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;

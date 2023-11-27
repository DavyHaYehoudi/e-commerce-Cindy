// notesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../../mocks/usersMock";

const notesSlice = createSlice({
  name: "notes",
  initialState: usersMock,
  reducers: {
    addNote: (state, action) => {
      const { clientId, id, content, date } = action.payload;
      const userIndex = state.findIndex((user) => user.id === clientId);

      if (userIndex !== -1) {
        state[userIndex] = {
          ...state[userIndex],
          notesAdmin: state[userIndex].notesAdmin
            ? [...state[userIndex].notesAdmin, { id, content, date }]
            : [{ id, content, date }],
        };
      }
    },
    deleteNote: (state, action) => {
      const { clientId, noteId } = action.payload;
      const userIndex = state.findIndex((user) => user.id === clientId);

      if (userIndex !== -1 && state[userIndex].notesAdmin) {
        state[userIndex] = {
          ...state[userIndex],
          notesAdmin: state[userIndex].notesAdmin.filter(
            (note) => note.id !== noteId
          ),
        };
      }
    },
  },
});

export const { addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;

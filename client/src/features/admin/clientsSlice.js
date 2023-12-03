import { createSlice } from "@reduxjs/toolkit";
import { clientsMock } from "../../mocks/clientsMock";

const clientsSlice = createSlice({
  name: "clients",
  initialState: clientsMock,
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
export const { addNote, deleteNote } = clientsSlice.actions;
export default clientsSlice.reducer;
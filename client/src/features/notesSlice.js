// notesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { usersMock } from "../mocks/usersMock";

const notesSlice = createSlice({
    name: "notes",
    initialState: usersMock,
    reducers: {
      addNote: (state, action) => {
        const { clientId, content } = action.payload;
        const user = state.find((user) => user.id === clientId);
  
        if (user) {
          user.notesAdmin = user.notesAdmin || [];
          user.notesAdmin.push(content);
        }
      },
      deleteNote: (state, action) => {
        const { clientId, noteIndex } = action.payload;
        const user = state.find((user) => user.id === clientId);
  
        if (user && user.notesAdmin) {
          user.notesAdmin.splice(noteIndex, 1);
        }
      },
    },
  });
  
  export const { addNote, deleteNote } = notesSlice.actions;
  export default notesSlice.reducer;

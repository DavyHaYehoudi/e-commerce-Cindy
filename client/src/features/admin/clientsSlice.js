import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";

const fetchClients = createAsyncThunk("clients/fetchClients", async () => {
  try {
    return customFetch("client");
  } catch (error) {
    handleFetchError(error);
  }
});

const clientsSlice = createSlice({
  name: "clients",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    addNote: (state, action) => {
      const { clientId, id, content, date } = action.payload;
      state.data = state.data.map((user) =>
        user.id === clientId
          ? {
              ...user,
              notesAdmin: user.notesAdmin
                ? [...user.notesAdmin, { id, content, date }]
                : [{ id, content, date }],
            }
          : user
      );
    },
    deleteNote: (state, action) => {
      const { clientId, noteId } = action.payload;
      state.data = state.data.map((user) =>
        user.id === clientId
          ? {
              ...user,
              notesAdmin: user.notesAdmin
                ? user.notesAdmin.filter((note) => note.id !== noteId)
                : user.notesAdmin, 
            }
          : user
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { addNote, deleteNote } = clientsSlice.actions;
export { fetchClients };
export default clientsSlice.reducer;
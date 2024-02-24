import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../helpers/services/customFetch";
import { handleFetchError } from "../../helpers/services/handleFetchError";
import { fetchOrders } from "./ordersSlice";

const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async ({ itemsPerPage }, { dispatch }) => {
    try {
      const { clients, totalClientsCount } = await customFetch(
        `clients?itemsPerPage=${itemsPerPage}`
      );
      const orderIds = clients.map((client) => client.orders).flat();
      dispatch(fetchOrders({ orderIds: JSON.stringify(orderIds) }));

      return { clients, totalClientsCount };
    } catch (error) {
      handleFetchError(error);
    }
  }
);

const addNoteAdmin = createAsyncThunk(
  "clients/addNoteAdmin",
  async ({ clientId, content }) => {
    try {
      const response = await customFetch(`clients/addNote/${clientId}`, {
        method: "PATCH",
        body: JSON.stringify({ content }),
      });
      return response;
    } catch (error) {
      handleFetchError(error);
      throw error;
    }
  }
);

const removeNoteAdmin = createAsyncThunk(
  "clients/removeNoteAdmin",
  async ({ clientId, noteId }) => {
    try {
      await customFetch(`clients/removeNote/${clientId}/${noteId}`, {
        method: "PATCH",
      });
      return { clientId, noteId };
    } catch (error) {
      handleFetchError(error);
      throw error;
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    data: [],
    totalClientsCount: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        const { clients, totalClientsCount } = action.payload;
        state.status = "succeeded";
        state.error = null;
        state.data = clients;
        state.totalClientsCount = totalClientsCount;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNoteAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNoteAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const { clientId, _id, content, date } = action.payload;
        state.data = state.data.map((user) =>
          user._id === clientId
            ? {
                ...user,
                notesAdmin: user.notesAdmin
                  ? [...user.notesAdmin, { _id, content, date }]
                  : [{ _id, content, date }],
              }
            : user
        );
      })
      .addCase(addNoteAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeNoteAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeNoteAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const { clientId, noteId } = action.payload;
        state.data = state.data.map((user) =>
          user._id === clientId
            ? {
                ...user,
                notesAdmin: user.notesAdmin
                  ? user.notesAdmin.filter((note) => note._id !== noteId)
                  : user.notesAdmin,
              }
            : user
        );
      })
      .addCase(removeNoteAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export { fetchClients, addNoteAdmin, removeNoteAdmin };
export default clientsSlice.reducer;

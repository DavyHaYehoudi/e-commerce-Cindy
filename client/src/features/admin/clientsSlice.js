import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../../services/customFetch";
import { handleFetchError } from "../../services/handleFetchError";
import { fetchOrders } from "./ordersSlice";

const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (
    {
      itemsPerPage,
      name = "",
      steps = "",
      credit = "",
      refund = "",
      exchange = "",
      trackingNumber = "",
      note = "",
      preciseDate = "",
      rangeDateStart = "",
      rangeDateEnd = "",
    },
    { dispatch }
  ) => {
    try {
      const queryString = new URLSearchParams({
        itemsPerPage,
        name,
        steps,
        credit,
        refund,
        exchange,
        trackingNumber,
        note,
        preciseDate,
        rangeDateStart,
        rangeDateEnd
      }).toString();

      const { clients, totalClientsCount } = await customFetch(
        `clients?${queryString}`
      );

      const orderIds = clients.map((client) => client.orders).flat();
      dispatch(fetchOrders({ orderIds: JSON.stringify(orderIds) }));

      return { clients, totalClientsCount };
    } catch (error) {
      handleFetchError(error);
    }
  }
);

const notesAdmin = createAsyncThunk(
  "clients/notesAdmin",
  async ({ clientId, noteId,content }) => {
    try {
      const response = await customFetch(`clients/${clientId}/notesAdmin`, {
        method: "PATCH",
        body: JSON.stringify({ content,noteId }),
      });
return response;
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
      .addCase(notesAdmin.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(notesAdmin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.type === "addingNote") {
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
        } else if (action.payload.type==="deletingNote") {
          const { clientId, noteId} = action.payload;
          console.log('action.payload :',action.payload);
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
        }
      })
      .addCase(notesAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export { fetchClients, notesAdmin};
export default clientsSlice.reducer;

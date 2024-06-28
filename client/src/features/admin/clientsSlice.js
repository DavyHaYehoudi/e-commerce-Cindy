import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrders } from "./ordersSlice";
import { Get, Patch } from "../../services/httpMethods";
import { toast } from "react-toastify";

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
      handleUnauthorized,
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
        rangeDateEnd,
      }).toString();

      const { clients, totalClientsCount } = await Get(
        `clients?${queryString}`,
        null,
        handleUnauthorized
      );

      const orderIds = clients.map((client) => client.orders).flat();
      dispatch(fetchOrders({ orderIds: JSON.stringify(orderIds) }));

      return { clients, totalClientsCount };
    } catch (error) {
      console.error("Erreur dans clientsSlice :", error);
    }
  }
);

const notesAdmin = createAsyncThunk(
  "clients/notesAdmin",
  async ({ clientId, noteId, content, handleUnauthorized }) => {
    return Patch(
      `clients/${clientId}/notesAdmin`,
      { content, noteId },
      null,
      handleUnauthorized
    );
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
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        const { clients, totalClientsCount } = action.payload || {};
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
          toast.success("La note sur le client a bien été enregistrée 😀");
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
        } else if (action.payload.type === "deletingNote") {
          toast.success("La note sur le client a bien été supprimée 😀");
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
        }
      })
      .addCase(notesAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export { fetchClients, notesAdmin };
export const { updateShippingAndBillingAddresses } = clientsSlice.actions;
export default clientsSlice.reducer;
